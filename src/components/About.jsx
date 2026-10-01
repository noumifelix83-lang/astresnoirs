import React from "react";
import { useReveal } from "../hooks/useReveal.js";
import { books } from "../data/books.js";
import { useLang } from "../i18n/LanguageContext.jsx";

/* "match" est le genre exact tel qu'écrit dans les données du catalogue (src/data/books.js). */
const GENRE_KEYS = ["Roman", "Poésie", "Essai", "Théâtre", "Contes", "Fables"];

export default function About() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();
  const { t } = useLang();

  const genres = GENRE_KEYS.map((match) => ({
    match,
    label: t(`about.genres.${match}`),
    count: books.filter((b) => b.genre === match).length,
  }));

  return (
    <section className="about section-pad" id="about">
      <div className="wrap about-grid">
        <div ref={refA} className={classA}>
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 style={{ marginTop: 14 }}>{t("about.title")}</h2>
          <div className="about-copy" style={{ marginTop: 24 }}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
          <p className="pull">{t("about.pull")}</p>
          <span className="eyebrow" style={{ display: "block", marginTop: 28 }}>
            {t("about.catalogueEyebrow")}
          </span>
          <div className="genre-row">
            {genres.map((g) =>
              g.count > 0 ? (
                <a href="#catalogue" className="genre-chip has-books" key={g.match}>
                  {g.label} <span className="count">{g.count}</span>
                </a>
              ) : (
                <span className="genre-chip is-empty" key={g.match}>
                  {g.label} <span className="count">{t("about.genreComingSoon")}</span>
                </span>
              )
            )}
          </div>
        </div>
        <div ref={refB} className={classB}>
          <div className="stat-col">
            <div className="stat">
              <span className="num">4</span>
              <span className="label">{t("about.stat1")}</span>
            </div>
            <div className="stat">
              <span className="num">11</span>
              <span className="label">{t("about.stat2")}</span>
            </div>
            <div className="stat">
              <span className="num">5</span>
              <span className="label">{t("about.stat3")}</span>
            </div>
            <div className="stat">
              <span className="num">2</span>
              <span className="label">{t("about.stat4")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
