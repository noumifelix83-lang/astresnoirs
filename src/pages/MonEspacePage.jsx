import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { statusMeta, formatDate, openManuscriptFile } from "../lib/manuscriptStatus.js";

export default function MonEspacePage() {
  const { user, loading, isStaff, signInWithGoogle, signOut, isSupabaseConfigured } = useAuth();
  const [items, setItems] = useState(null); // null = chargement
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setItems(null);
      return;
    }
    let cancelled = false;
    // Filtre explicite sur l'auteur : un membre de l'équipe voit sinon TOUS les manuscrits.
    supabase
      .from("manuscripts")
      .select("id,title,genre,status,created_at,file_path")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) setError("Impossible de charger vos manuscrits pour le moment.");
        else setItems(data || []);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isSupabaseConfigured]);

  async function open(path) {
    setFileError("");
    const ok = await openManuscriptFile(path);
    if (!ok) setFileError("Impossible d'ouvrir le fichier pour le moment. Réessayez dans un instant.");
  }

  return (
    <main className="actualites-page section-pad">
      <div className="wrap wrap-narrow">
        <span className="eyebrow">Espace auteur</span>
        <h1 style={{ marginTop: 10 }}>Mes manuscrits</h1>

        {!isSupabaseConfigured && <p className="lede">L'espace auteur sera bientôt disponible.</p>}
        {isSupabaseConfigured && loading && <p className="lede">Chargement…</p>}

        {isSupabaseConfigured && !loading && !user && (
          <>
            <p className="lede">Connectez-vous avec votre compte Google pour suivre l'avancement de vos manuscrits.</p>
            <button type="button" className="btn btn-primary plate google-btn" onClick={signInWithGoogle} style={{ marginTop: 22 }}>
              Se connecter avec Google
            </button>
          </>
        )}

        {isSupabaseConfigured && !loading && user && (
          <>
            <p className="ms-who">
              Connecté en tant que <strong>{user.email}</strong> ·{" "}
              <button type="button" className="link-btn" onClick={signOut}>
                se déconnecter
              </button>
              {isStaff && (
                <>
                  {" "}
                  · <Link to="/tableau-de-bord" className="link-btn">Tableau de bord de l'équipe</Link>
                </>
              )}
            </p>

            {error && <p className="form-note form-note-error">{error}</p>}
            {fileError && <p className="form-note form-note-error">{fileError}</p>}
            {!error && items === null && <p className="lede">Chargement de vos manuscrits…</p>}

            {items && items.length === 0 && (
              <div className="ms-empty">
                <p>Vous n'avez pas encore soumis de manuscrit.</p>
                <Link to="/#auteurs" className="btn btn-primary plate" style={{ marginTop: 16 }}>
                  Soumettre un manuscrit
                </Link>
              </div>
            )}

            {items && items.length > 0 && (
              <div className="ms-list">
                {items.map((m) => {
                  const st = statusMeta(m.status);
                  return (
                    <article className="ms-card" key={m.id}>
                      <div className="ms-card-head">
                        <div>
                          <h3>{m.title}</h3>
                          <p className="ms-meta">
                            {m.genre} · envoyé le {formatDate(m.created_at)}
                          </p>
                        </div>
                        <span className={"status-badge s-" + m.status.replace(/\s/g, "-")}>{st.label}</span>
                      </div>
                      <p className="ms-status-text">{st.authorText}</p>
                      <button type="button" className="link-btn" onClick={() => open(m.file_path)}>
                        Ouvrir mon fichier
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
