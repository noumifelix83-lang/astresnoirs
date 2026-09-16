import React from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Vignette d'aperçu pour la liste des actualités — pas de lecteur vidéo ici,
    juste l'image de couverture avec une icône « lecture » si l'article en contient une. */
export default function ActualiteCard({ post }) {
  const [ref, cls] = useReveal();

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
        <h3>{post.title}</h3>
        <p className="actu-excerpt">{post.excerpt}</p>
        <span className="actu-readmore">Lire la suite →</span>
      </div>
    </Link>
  );
}
