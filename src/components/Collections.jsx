import React from "react";
import { useReveal } from "../hooks/useReveal.js";

const COLLECTIONS = [
  {
    role: "Essais & réflexion",
    name: "Sapiens",
    desc: "Sciences humaines, pensée africaine contemporaine et essais qui éclairent le monde d'aujourd'hui.",
    glyph: (
      <>
        <circle cx="20" cy="20" r="8" />
        <path d="M20 2v6M20 32v6M2 20h6M32 20h6M7 7l4.2 4.2M28.8 28.8L33 33M33 7l-4.2 4.2M11.2 28.8L7 33" />
      </>
    ),
  },
  {
    role: "Contes & oralité",
    name: "Calebasse",
    desc: "Contes, fables et traditions orales — la sagesse ancestrale transmise et mise en page.",
    glyph: (
      <>
        <path d="M8 18c0-8 5-13 12-13s12 5 12 13-6 16-12 16S8 26 8 18Z" />
        <path d="M12 15c4 3 12 3 16 0" />
      </>
    ),
  },
  {
    role: "Romans & poésie",
    name: "Rêve d'Afrique",
    desc: "Les grands récits du continent : fiction, poésie et voix romanesques qui traversent les frontières.",
    glyph: (
      <>
        <path d="M4 30h32" />
        <circle cx="20" cy="16" r="7" />
        <path d="M4 30c4-6 9-9 16-9s12 3 16 9" />
      </>
    ),
  },
  {
    role: "Littérature pour enfants",
    name: "Jeunesse",
    desc: "Des histoires illustrées pensées pour donner aux plus jeunes le goût de lire tôt.",
    glyph: <path d="M20 4l3.6 8.2L32 14l-6 6 1.6 10.4L20 26l-7.6 4.4L14 20l-6-6 8.4-1.8L20 4Z" />,
  },
];

export default function Collections() {
  const [headRef, headClass] = useReveal();
  const [gridRef, gridClass] = useReveal();

  return (
    <section className="collections section-pad" id="collections">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">Quatre collections</span>
          <h2>Un rayon pour chaque lecture.</h2>
          <p className="lede">Du savoir à l'imaginaire, chaque collection porte une voix et un lectorat.</p>
        </div>
      </div>
      <div className="wrap">
        <div ref={gridRef} className={"coll-grid " + gridClass}>
          {COLLECTIONS.map((c) => (
            <article className="coll-card" key={c.name}>
              <svg
                className="coll-glyph"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                {c.glyph}
              </svg>
              <div>
                <span className="role">{c.role}</span>
                <h3>{c.name}</h3>
              </div>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
