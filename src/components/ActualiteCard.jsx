import React from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n/LanguageContext.jsx";

/** Vignette d'aperçu pour la liste des actualités — pas de lecteur vidéo ici,
    juste l'image de couverture avec une icône « lecture » si l'article en contient une. */
export default function ActualiteCard({ post }) {
  const [ref, cls] = useReveal();
  const { t, pick, lang } = useLang();
  const locale = lang === "en" ? "en-US" : "fr-FR";

  function formatDate(iso) {
    return new Date(iso + "T00:00:00").toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <Link to={`/actualites/${post.id}`} ref={ref} className={"actu-card actu-card-link " + cls}>
      {post.poster && (
        <div className="actu-media actu-thumb" style={{ backgroundImage: `url(${post.poster})` }}>
          {post.video && (
            <span className="actu-play" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          )}
        </div>
      )}
      <div className="actu-body">
        <time className="actu-date">{formatDate(post.date)}</time>
        <h3>{pick(post.title)}</h3>
        <p className="actu-excerpt">{pick(post.excerpt)}</p>
        <span className="actu-readmore">{t("actualites.readMore")}</span>
      </div>
    </Link>
  );
}
