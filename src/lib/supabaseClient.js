import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `null` tant que le projet Supabase n'est pas configuré (variables d'environnement
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY absentes) — le reste du code doit vérifier
 * `isSupabaseConfigured` avant d'utiliser `supabase`, pour dégrader proprement plutôt
 * que de planter tant que le projet n'existe pas encore.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
