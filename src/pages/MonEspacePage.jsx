import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { statusMeta, formatDate, openManuscriptFile } from "../lib/manuscriptStatus.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function MonEspacePage() {
  const { user, loading, isStaff, signInWithGoogle, signOut, isSupabaseConfigured } = useAuth();
  const { t, lang } = useLang();
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
        if (err) setError(t("monEspace.loadError"));
        else setItems(data || []);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isSupabaseConfigured]);

  async function open(path) {
    setFileError("");
    const ok = await openManuscriptFile(path);
    if (!ok) setFileError(t("monEspace.fileOpenError"));
  }

  return (
    <main className="actualites-page section-pad">
      <div className="wrap wrap-narrow">
        <span className="eyebrow">{t("monEspace.eyebrow")}</span>
        <h1 style={{ marginTop: 10 }}>{t("monEspace.title")}</h1>

        {!isSupabaseConfigured && <p className="lede">{t("monEspace.comingSoon")}</p>}
        {isSupabaseConfigured && loading && <p className="lede">{t("monEspace.loading")}</p>}

        {isSupabaseConfigured && !loading && !user && (
          <>
            <p className="lede">{t("monEspace.loginPrompt")}</p>
            <button type="button" className="btn btn-primary plate google-btn" onClick={signInWithGoogle} style={{ marginTop: 22 }}>
              {t("monEspace.googleSignIn")}
            </button>
          </>
        )}

        {isSupabaseConfigured && !loading && user && (
          <>
            <p className="ms-who">
              {t("monEspace.connectedAs")} <strong>{user.email}</strong> ·{" "}
              <button type="button" className="link-btn" onClick={signOut}>
                {t("monEspace.signOut")}
              </button>
              {isStaff && (
                <>
                  {" "}
                  · <Link to="/tableau-de-bord" className="link-btn">{t("monEspace.dashboardLink")}</Link>
                </>
              )}
            </p>

            {error && <p className="form-note form-note-error">{error}</p>}
            {fileError && <p className="form-note form-note-error">{fileError}</p>}
            {!error && items === null && <p className="lede">{t("monEspace.loadingList")}</p>}

            {items && items.length === 0 && (
              <div className="ms-empty">
                <p>{t("monEspace.emptyText")}</p>
                <Link to="/#auteurs" className="btn btn-primary plate" style={{ marginTop: 16 }}>
                  {t("monEspace.submitLink")}
                </Link>
              </div>
            )}

            {items && items.length > 0 && (
              <div className="ms-list">
                {items.map((m) => {
                  const st = statusMeta(m.status, lang);
                  return (
                    <article className="ms-card" key={m.id}>
                      <div className="ms-card-head">
                        <div>
                          <h3>{m.title}</h3>
                          <p className="ms-meta">
                            {m.genre} · {t("monEspace.sentOn")} {formatDate(m.created_at, lang)}
                          </p>
                        </div>
                        <span className={"status-badge s-" + m.status.replace(/\s/g, "-")}>{st.label}</span>
                      </div>
                      <p className="ms-status-text">{st.authorText}</p>
                      <button type="button" className="link-btn" onClick={() => open(m.file_path)}>
                        {t("monEspace.openFile")}
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
