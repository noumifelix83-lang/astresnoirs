import React from "react";
import { actualites } from "../data/actualites.js";
import { useReveal } from "../hooks/useReveal.js";

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ActualiteCard({ post, featured }) {
  const [ref, cls] = useReveal();

  return (
    <article ref={ref} className={"actu-card" + (featured ? " actu-featured" : "") + " " + cls}>
      {post.video && (
        <div className="actu-media">
          <video controls preload="none" poster={post.poster} playsInline>
            <source src={post.video} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="actu-body">
        <time className="actu-date">{formatDate(post.date)}</time>
        <h3>{post.title}</h3>
        <p className="actu-excerpt">{post.excerpt}</p>
        {featured &&
          post.body.map((p, i) => (
            <p className="actu-paragraph" key={i}>
              {p}
            </p>
          ))}
      </div>
    </article>
  );
}

export default function Actualites() {
  const [headRef, headClass] = useReveal();
  const [featured, ...rest] = actualites;

  if (!featured) return null;

  return (
    <section className="actualites section-pad" id="actualites">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">Actualités</span>
          <h2>Les dernières nouvelles de la maison.</h2>
          <p className="lede">
            Annonces, publications et coulisses des Éditions Astres Noirs — un premier aperçu du journal en ligne
            à venir.
          </p>
        </div>
        <ActualiteCard post={featured} featured />
        {rest.length > 0 && (
          <div className="actu-grid">
            {rest.map((post) => (
              <ActualiteCard post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
