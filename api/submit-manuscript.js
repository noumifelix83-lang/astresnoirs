import { Resend } from "resend";

const DEST_EMAIL = "aastresnoirs@gmail.com";
const MAX_FILE_BYTES = 3.5 * 1024 * 1024; // 3,5 Mo — reste sous la limite de 4,5 Mo par requête de Vercel une fois encodé en base64

/**
 * Reçoit la soumission de manuscrit du formulaire (src/components/Auteurs.jsx) en JSON
 * (fichier encodé en base64) et l'envoie par e-mail via Resend, pièce jointe comprise.
 * Nécessite la variable d'environnement RESEND_API_KEY (Vercel → Project → Settings →
 * Environment Variables).
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  const { name, email, title, genre, message, botcheck, fileName, fileType, fileBase64 } = req.body || {};

  // Piège à robots : un champ caché que seul un bot remplirait.
  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !title || !genre || !message || !fileBase64 || !fileName) {
    return res.status(400).json({ success: false, message: "Champs manquants." });
  }

  const approxFileBytes = (fileBase64.length * 3) / 4;
  if (approxFileBytes > MAX_FILE_BYTES) {
    return res.status(413).json({ success: false, message: "Fichier trop volumineux." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante côté serveur.");
    return res.status(500).json({ success: false, message: "Configuration serveur incomplète." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Astres Noirs — Site <manuscrits@astresnoirs.com>",
      to: DEST_EMAIL,
      replyTo: email,
      subject: `Nouvelle soumission de manuscrit — ${title}`,
      text:
        `Nom : ${name}\n` +
        `Courriel : ${email}\n` +
        `Titre de l'ouvrage : ${title}\n` +
        `Genre : ${genre}\n\n` +
        `Résumé & présentation de l'auteur :\n${message}`,
      attachments: [{ filename: fileName, content: fileBase64 }],
    });

    if (error) {
      console.error("Erreur Resend :", error);
      return res.status(502).json({ success: false, message: "Échec de l'envoi." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur inattendue :", err);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
}
