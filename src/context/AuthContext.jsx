import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);
const AFTER_LOGIN_KEY = "astres-noirs-after-login";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      /* Au retour de Google, on ramène l'auteur sur le formulaire. L'ancre est
         mémorisée ici plutôt que dans l'adresse de retour : Supabase ajoute les
         jetons de connexion APRÈS un éventuel « #auteurs », ce qui les rend
         illisibles et la session n'était alors jamais reconnue. */
      if (event === "SIGNED_IN") {
        let target = null;
        try {
          target = window.sessionStorage.getItem(AFTER_LOGIN_KEY);
          window.sessionStorage.removeItem(AFTER_LOGIN_KEY);
        } catch {
          /* stockage indisponible : on reste simplement en haut de page */
        }
        setTimeout(() => {
          if (target) document.getElementById(target)?.scrollIntoView();
          /* Supabase efface les jetons de l'adresse en laissant un « # » orphelin :
             on le retire une fois la lecture de la session terminée. */
          if (window.location.href.endsWith("#")) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          }
        }, 350);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInWithGoogle() {
    if (!isSupabaseConfigured) return;
    try {
      window.sessionStorage.setItem(AFTER_LOGIN_KEY, "auteurs");
    } catch {
      /* sans stockage, la connexion fonctionne quand même */
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + window.location.pathname },
    });
  }

  async function signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }

  const value = { user, loading, signInWithGoogle, signOut, isSupabaseConfigured };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
