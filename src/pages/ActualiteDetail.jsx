import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { actualites } from "../data/actualites.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function ActualiteDetail() {
  const { id } = useParams();
  const post = actualites.find((p) => p.id === id);
  const { t, pick, lang } = useLang();
  const locale = lang === "en" ? "en-US" : "fr-FR";

  function formatDate(iso) {
    return new Date(iso + "T00:00:00").toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <main className="actualites-page section-pad">
        <div className="wrap">
          <p>{t("actualites.notFound")}</p>
          <Link to="/actualites" className="btn btn-ghost" style={{ marginTop: 20 }}>
            {t("actualites.backLink")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="actualites-page section-pad">
      <div className="wrap wrap-narrow">
        <Link to="/actualites" className="actu-back">
          {t("actualites.backLink")}
        </Link>
        <time className="actu-date" style={{ display: "block", marginTop: 18 }}>
          {formatDate(post.date)}
        </time>
        <h1 style={{ marginTop: 10 }}>{pick(post.title)}</h1>

        {post.video && (
          <div className="actu-media actu-detail-media">
            <video controls preload="none" poster={post.poster} playsInline>
              <source src={post.video} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="actu-detail-body">
          {post.body.map((p, i) => (
            <p key={i}>{pick(p)}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
