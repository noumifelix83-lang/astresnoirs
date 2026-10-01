import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict } from "./dictionary.js";

const LanguageContext = createContext(null);
const STORAGE_KEY = "astres-noirs-lang";

function detectDefault() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    /* stockage indisponible : on retombe sur la détection navigateur */
  }
  const nav = (navigator.language || "fr").toLowerCase();
  return nav.startsWith("fr") ? "fr" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectDefault);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* stockage indisponible : la préférence ne sera simplement pas mémorisée */
    }
  }, [lang]);

  function setLang(next) {
    setLangState(next === "en" ? "en" : "fr");
  }

  function toggleLang() {
    setLangState((l) => (l === "fr" ? "en" : "fr"));
  }

  /** t("section.key") lit la chaîne dans le dictionnaire pour la langue active. */
  function t(path) {
    const parts = path.split(".");
    let node = dict;
    for (const p of parts) node = node?.[p];
    if (node == null) return path;
    return typeof node === "object" ? node[lang] ?? node.fr ?? path : node;
  }

  /** pick(obj) lit un champ bilingue {fr, en} présent directement dans une donnée (livres, articles…). */
  function pick(bilingual, fallback = "") {
    if (!bilingual) return fallback;
    if (typeof bilingual === "string") return bilingual;
    return bilingual[lang] ?? bilingual.fr ?? fallback;
  }

  const value = useMemo(() => ({ lang, setLang, toggleLang, t, pick }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
