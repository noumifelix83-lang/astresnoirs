import { supabase } from "./supabaseClient.js";
import { dict } from "../i18n/dictionary.js";

/** Les quatre étapes du parcours d'un manuscrit (valeurs stockées en base, voir supabase/02-equipe-editoriale.sql). */
export const STATUSES = Object.keys(dict.statuses).map((value) => ({ value }));

export function statusMeta(value, lang = "fr") {
  const entry = dict.statuses[value] || dict.statuses.nouveau;
  return {
    value,
    label: entry.label[lang] || entry.label.fr,
    authorText: entry.authorText[lang] || entry.authorText.fr,
  };
}

export function formatDate(iso, lang = "fr") {
  const locale = lang === "en" ? "en-US" : "fr-FR";
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
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
