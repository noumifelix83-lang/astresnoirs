import { supabase } from "./supabaseClient.js";

/** Les quatre étapes du parcours d'un manuscrit (valeurs stockées en base, voir supabase/02-equipe-editoriale.sql). */
export const STATUSES = [
  {
    value: "nouveau",
    label: "Reçu",
    authorText: "Votre manuscrit nous est bien parvenu. Il va être transmis au comité de lecture.",
  },
  {
    value: "en lecture",
    label: "En lecture",
    authorText: "Le comité de lecture étudie actuellement votre texte.",
  },
  {
    value: "accepté",
    label: "Accepté",
    authorText: "Félicitations ! Notre équipe va vous contacter pour la suite.",
  },
  {
    value: "refusé",
    label: "Non retenu",
    authorText: "Le comité n'a pas retenu votre manuscrit pour le moment. Merci de votre confiance.",
  },
];

export function statusMeta(value) {
  return STATUSES.find((s) => s.value === value) || STATUSES[0];
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Ouvre le fichier d'un manuscrit dans un nouvel onglet via un lien temporaire (5 min).
 * L'onglet est ouvert AVANT l'appel réseau : sinon les navigateurs (Safari, mobiles)
 * bloquent la fenêtre comme un pop-up.
 */
export async function openManuscriptFile(path) {
  const tab = window.open("", "_blank");
  const { data, error } = await supabase.storage.from("manuscripts").createSignedUrl(path, 300);
  if (error || !data?.signedUrl) {
    if (tab) tab.close();
    return false;
  }
  if (tab) {
    tab.opener = null;
    tab.location.href = data.signedUrl;
  } else {
    window.location.href = data.signedUrl;
  }
  return true;
}
