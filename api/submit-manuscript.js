import { Resend } from "resend";

const DEST_EMAIL = "aastresnoirs@gmail.com";
const FROM = "Astres Noirs — Site <manuscrits@astresnoirs.net>";
const SITE = "https://www.astresnoirs.net";

/**
 * Reçoit une soumission de manuscrit (src/components/Auteurs.jsx) une fois le fichier
 * stocké dans Supabase, puis :
 *   1. notifie le comité éditorial par e-mail (avec un lien temporaire vers le fichier) ;
 *   2. envoie à l'auteur un accusé de réception.
 *
 * Seul un utilisateur connecté (jeton Supabase valide) peut l'appeler : sans cela,
 * n'importe qui pourrait faire envoyer des e-mails au nom de la maison vers
 * n'importe quelle adresse. L'adresse de l'auteur est celle de son compte Google,
 * jamais celle fournie dans la requête.
 *
 * Variables d'environnement : RESEND_API_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY.
 */
async function getVerifiedUser(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const url = process.env.VITE_SUPABASE_URL;
  const anon = process.env.VITE_SUPABASE_ANON_KEY;
  if (!token || !url || !anon) return null;

  const r = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anon, Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const user = await r.json();
  return user?.email ? user : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  const user = await getVerifiedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: "Connexion requise." });
  }

  const { name, title, genre, message, fileName, fileUrl } = req.body || {};
  if (!title || !genre || !message) {
    return res.status(400).json({ success: false, message: "Champs manquants." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante côté serveur.");
    return res.status(500).json({ success: false, message: "Configuration serveur incomplète." });
  }

  const authorName = String(name || user.user_metadata?.full_name || user.email).slice(0, 120);
  const authorEmail = user.email;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: DEST_EMAIL,
      replyTo: authorEmail,
      subject: `Nouvelle soumission de manuscrit — ${title}`,
      text:
        `Nom : ${authorName}\n` +
        `Courriel : ${authorEmail}\n` +
        `Titre de l'ouvrage : ${title}\n` +
        `Genre : ${genre}\n\n` +
        `Résumé & présentation de l'auteur :\n${message}\n\n` +
        (fileUrl
          ? `Manuscrit (${fileName || "fichier"}) : ${fileUrl}\n(lien valable 30 jours — le fichier reste consultable dans le tableau de bord : ${SITE}/tableau-de-bord)`
          : `Manuscrit : à consulter dans le tableau de bord : ${SITE}/tableau-de-bord`),
    });

    if (error) {
      console.error("Erreur Resend (notification équipe) :", error);
      return res.status(502).json({ success: false, message: "Échec de l'envoi." });
    }

    // Accusé de réception à l'auteur : un échec ici n'annule pas la soumission.
    const ack = await resend.emails.send({
      from: FROM,
      to: authorEmail,
      replyTo: DEST_EMAIL,
      subject: `Nous avons bien reçu votre manuscrit — ${title}`,
      text:
        `Bonjour ${authorName},\n\n` +
        `Nous avons bien reçu votre manuscrit « ${title} » (${genre}). Merci de votre confiance.\n\n` +
        `Votre texte va être transmis à notre comité de lecture. Vous pouvez suivre l'avancement de ` +
        `votre dossier à tout moment depuis votre espace auteur :\n${SITE}/mon-espace\n\n` +
        `Nous reviendrons vers vous dans les meilleurs délais. Pour toute question, répondez simplement à ce message.\n\n` +
        `L'équipe des Éditions Astres Noirs\nQui Lira Vivra`,
    });
    if (ack.error) console.error("Erreur Resend (accusé de réception) :", ack.error);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur inattendue :", err);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
}
