import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInWithGoogle() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + window.location.pathname + "#auteurs" },
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
