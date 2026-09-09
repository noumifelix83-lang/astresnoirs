import React from "react";
import { useReveal } from "../hooks/useReveal.js";
import { books } from "../data/books.js";

/* "match" est le genre exact tel qu'écrit dans les données du catalogue (src/data/books.js). */
const GENRES = [
  { label: "Romans", match: "Roman" },
  { label: "Poésie", match: "Poésie" },
  { label: "Essais", match: "Essai" },
  { label: "Théâtre", match: "Théâtre" },
  { label: "Contes", match: "Contes" },
  { label: "Fables", match: "Fables" },
].map((g) => ({ ...g, count: books.filter((b) => b.genre === g.match).length }));

export default function About() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();

  return (
    <section className="about section-pad" id="about">
      <div className="wrap about-grid">
        <div ref={refA} className={classA}>
          <span className="eyebrow">La maison</span>
          <h2 style={{ marginTop: 14 }}>
            Une maison généraliste, née à Yaoundé, tournée vers le monde.
          </h2>
          <div className="about-copy" style={{ marginTop: 24 }}>
            <p>
              Face à un marché de l'édition national et international exigeant, nous avons choisi d'ouvrir nos
              portes à tous les genres littéraires. Chaque manuscrit reçoit un travail éditorial méticuleux, mené par
              une équipe de passionnés du livre, pour que le projet de l'auteur devienne une réussite éditoriale.
            </p>
            <p>
              Notre stratégie de communication et nos plateformes digitales font vivre le lien entre éditeur, auteurs
              et lecteurs, aux quatre coins du monde — dans les librairies, les bibliothèques, les écoles, comme sur
              les réseaux.
            </p>
          </div>
          <p className="pull">« Aux Éditions Astres Noirs, chaque livre a son histoire et son caractère unique. »</p>
          <span className="eyebrow" style={{ display: "block", marginTop: 28 }}>
            Déjà dans notre catalogue
          </span>
          <div className="genre-row">
            {GENRES.map((g) =>
              g.count > 0 ? (
                <a href="#catalogue" className="genre-chip has-books" key={g.label}>
                  {g.label} <span className="count">{g.count}</span>
                </a>
              ) : (
                <span className="genre-chip is-empty" key={g.label}>
                  {g.label} <span className="count">à venir</span>
                </span>
              )
            )}
          </div>
        </div>
        <div ref={refB} className={classB}>
          <div className="stat-col">
            <div className="stat">
              <span className="num">4</span>
              <span className="label">Collections actives, du savoir à la jeunesse</span>
            </div>
            <div className="stat">
              <span className="num">11</span>
              <span className="label">Membres de l'équipe éditoriale &amp; commerciale</span>
            </div>
            <div className="stat">
              <span className="num">5</span>
              <span className="label">Relecteurs dédiés à la qualité du texte</span>
            </div>
            <div className="stat">
              <span className="num">2</span>
              <span className="label">Réseaux de diffusion, local et international</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
