import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { STATUSES, statusMeta, formatDate, openManuscriptFile } from "../lib/manuscriptStatus.js";

export default function TableauDeBordPage() {
  const { user, loading, isStaff, signInWithGoogle, isSupabaseConfigured } = useAuth();
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
        if (err) setError("Impossible de charger les manuscrits.");
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
      setNotice("Le changement de statut n'a pas pu être enregistré.");
    }
  }

  async function open(path) {
    setNotice("");
    const ok = await openManuscriptFile(path);
    if (!ok) setNotice("Impossible d'ouvrir le fichier pour le moment.");
  }

  return (
    <main className="actualites-page section-pad">
      <div className="wrap">
        <span className="eyebrow">Équipe éditoriale</span>
        <h1 style={{ marginTop: 10 }}>Tableau de bord</h1>

        {!isSupabaseConfigured && <p className="lede">Base de données non configurée.</p>}
        {isSupabaseConfigured && loading && <p className="lede">Chargement…</p>}

        {isSupabaseConfigured && !loading && !user && (
          <>
            <p className="lede">Espace réservé à l'équipe éditoriale. Connectez-vous avec votre compte Google.</p>
            <button type="button" className="btn btn-primary plate google-btn" onClick={signInWithGoogle} style={{ marginTop: 22 }}>
              Se connecter avec Google
            </button>
          </>
        )}

        {isSupabaseConfigured && !loading && user && !isStaff && (
          <p className="lede">
            Ce compte ({user.email}) n'a pas accès au tableau de bord. Si vous faites partie de l'équipe, demandez
            qu'on ajoute votre adresse.
          </p>
        )}

        {isSupabaseConfigured && !loading && user && isStaff && (
          <>
            <div className="staff-filters" role="tablist" aria-label="Filtrer par statut">
              <button type="button" className={"chip-btn" + (filter === "tous" ? " is-active" : "")} onClick={() => setFilter("tous")}>
                Tous <span className="count">{counts.tous}</span>
              </button>
              {STATUSES.map((s) => (
                <button
                  type="button"
                  key={s.value}
                  className={"chip-btn" + (filter === s.value ? " is-active" : "")}
                  onClick={() => setFilter(s.value)}
                >
                  {s.label} <span className="count">{counts[s.value]}</span>
                </button>
              ))}
            </div>

            {error && <p className="form-note form-note-error">{error}</p>}
            {notice && <p className="form-note form-note-error">{notice}</p>}
            {!error && items === null && <p className="lede">Chargement des manuscrits…</p>}
            {items && visible.length === 0 && <p className="lede">Aucun manuscrit dans cette catégorie.</p>}

            <div className="ms-list">
              {visible.map((m) => {
                const st = statusMeta(m.status);
                return (
                  <article className="ms-card" key={m.id}>
                    <div className="ms-card-head">
                      <div>
                        <h3>{m.title}</h3>
                        <p className="ms-meta">
                          {m.name} · <a href={`mailto:${m.email}`}>{m.email}</a> · {m.genre} · {formatDate(m.created_at)}
                        </p>
                      </div>
                      <span className={"status-badge s-" + m.status.replace(/\s/g, "-")}>{st.label}</span>
                    </div>

                    <details className="ms-details">
                      <summary>Résumé et présentation de l'auteur</summary>
                      <p>{m.message}</p>
                    </details>

                    <div className="ms-actions">
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => open(m.file_path)}>
                        Ouvrir le fichier
                      </button>
                      <label className="ms-status-select">
                        Statut
                        <select value={m.status} onChange={(e) => changeStatus(m.id, e.target.value)}>
                          {STATUSES.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
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
          <Link to="/mon-espace" className="link-btn">← Mon espace auteur</Link>
        </p>
      </div>
    </main>
  );
}
