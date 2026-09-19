import React, { useEffect } from "react";
import { actualites } from "../data/actualites.js";
import ActualiteCard from "../components/ActualiteCard.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function ActualitesPage() {
  const [headRef, headClass] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="actualites-page section-pad">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">Actualités</span>
          <h1>Astres Actu, le futur journal en ligne de la maison.</h1>
          <p className="lede">
            En attendant son lancement, retrouvez ici les annonces, publications et coulisses des Éditions Astres
            Noirs — les premières pages d'Astres Actu.
          </p>
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
