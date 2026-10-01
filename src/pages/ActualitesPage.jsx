import React, { useEffect } from "react";
import { actualites } from "../data/actualites.js";
import ActualiteCard from "../components/ActualiteCard.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function ActualitesPage() {
  const [headRef, headClass] = useReveal();
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="actualites-page section-pad">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">{t("actualites.pageEyebrow")}</span>
          <h1>{t("actualites.pageTitle")}</h1>
          <p className="lede">{t("actualites.pageLede")}</p>
        </div>
        <div className="actu-grid actu-grid-page">
          {actualites.map((post) => (
            <ActualiteCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
