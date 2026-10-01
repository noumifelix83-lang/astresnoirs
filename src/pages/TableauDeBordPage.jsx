import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { STATUSES, statusMeta, formatDate, openManuscriptFile } from "../lib/manuscriptStatus.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function TableauDeBordPage() {
  const { user, loading, isStaff, signInWithGoogle, isSupabaseConfigured } = useAuth();
  const { t, lang } = useLang();
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("tous");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user || !isStaff) {
      setItems(null);
      return;
    }
    let cancelled = false;
    supabase
      .from("manuscripts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) setError(t("tableauDeBord.loadError"));
        else setItems(data || []);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isStaff, isSupabaseConfigured]);

  const counts = useMemo(() => {
    const c = { tous: items ? items.length : 0 };
    STATUSES.forEach((s) => (c[s.value] = 0));
    (items || []).forEach((m) => {
      if (c[m.status] !== undefined) c[m.status] += 1;
    });
    return c;
  }, [items]);

  const visible = (items || []).filter((m) => filter === "tous" || m.status === filter);

  async function changeStatus(id, status) {
    setNotice("");
    const previous = items;
    setItems((list) => list.map((m) => (m.id === id ? { ...m, status } : m))); // affichage immédiat
    const { error: err } = await supabase
      .from("manuscripts")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (err) {
      setItems(previous); // on annule si la base a refusé
      setNotice(t("tableauDeBord.statusUpdateError"));
    }
  }

  async function open(path) {
    setNotice("");
    const ok = await openManuscriptFile(path);
    if (!ok) setNotice(t("tableauDeBord.fileOpenError"));
  }

  return (
    <main className="actualites-page section-pad">
      <div className="wrap">
        <span className="eyebrow">{t("tableauDeBord.eyebrow")}</span>
        <h1 style={{ marginTop: 10 }}>{t("tableauDeBord.title")}</h1>

        {!isSupabaseConfigured && <p className="lede">{t("tableauDeBord.notConfigured")}</p>}
        {isSupabaseConfigured && loading && <p className="lede">{t("tableauDeBord.loading")}</p>}

        {isSupabaseConfigured && !loading && !user && (
          <>
            <p className="lede">{t("tableauDeBord.reservedPrompt")}</p>
            <button type="button" className="btn btn-primary plate google-btn" onClick={signInWithGoogle} style={{ marginTop: 22 }}>
              {t("tableauDeBord.googleSignIn")}
            </button>
          </>
        )}

        {isSupabaseConfigured && !loading && user && !isStaff && (
          <p className="lede">{t("tableauDeBord.noAccess").replace("{email}", user.email)}</p>
        )}

        {isSupabaseConfigured && !loading && user && isStaff && (
          <>
            <div className="staff-filters" role="tablist" aria-label={t("tableauDeBord.filtersAria")}>
              <button type="button" className={"chip-btn" + (filter === "tous" ? " is-active" : "")} onClick={() => setFilter("tous")}>
                {t("tableauDeBord.filterAll")} <span className="count">{counts.tous}</span>
              </button>
              {STATUSES.map((s) => {
                const meta = statusMeta(s.value, lang);
                return (
                  <button
                    type="button"
                    key={s.value}
                    className={"chip-btn" + (filter === s.value ? " is-active" : "")}
                    onClick={() => setFilter(s.value)}
                  >
                    {meta.label} <span className="count">{counts[s.value]}</span>
                  </button>
                );
              })}
            </div>

            {error && <p className="form-note form-note-error">{error}</p>}
            {notice && <p className="form-note form-note-error">{notice}</p>}
            {!error && items === null && <p className="lede">{t("tableauDeBord.loadingList")}</p>}
            {items && visible.length === 0 && <p className="lede">{t("tableauDeBord.emptyCategory")}</p>}

            <div className="ms-list">
              {visible.map((m) => {
                const st = statusMeta(m.status, lang);
                return (
                  <article className="ms-card" key={m.id}>
                    <div className="ms-card-head">
                      <div>
                        <h3>{m.title}</h3>
                        <p className="ms-meta">
                          {m.name} · <a href={`mailto:${m.email}`}>{m.email}</a> · {m.genre} · {formatDate(m.created_at, lang)}
                        </p>
                      </div>
                      <span className={"status-badge s-" + m.status.replace(/\s/g, "-")}>{st.label}</span>
                    </div>

                    <details className="ms-details">
                      <summary>{t("tableauDeBord.summaryDetails")}</summary>
                      <p>{m.message}</p>
                    </details>

                    <div className="ms-actions">
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => open(m.file_path)}>
                        {t("tableauDeBord.openFile")}
                      </button>
                      <label className="ms-status-select">
                        {t("tableauDeBord.statusLabel")}
                        <select value={m.status} onChange={(e) => changeStatus(m.id, e.target.value)}>
                          {STATUSES.map((s) => (
                            <option key={s.value} value={s.value}>
                              {statusMeta(s.value, lang).label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        <p className="ms-who" style={{ marginTop: 32 }}>
          <Link to="/mon-espace" className="link-btn">{t("tableauDeBord.backLink")}</Link>
        </p>
      </div>
    </main>
  );
}
