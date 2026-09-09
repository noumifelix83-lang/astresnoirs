import React from "react";
import { useReveal } from "../hooks/useReveal.js";

const STEPS = [
  { title: "Envoi du manuscrit", text: "Roman, poésie, essai, théâtre, conte ou fable — envoyez votre texte complet par courriel." },
  { title: "Comité de lecture", text: "Cinq relecteurs et le comité éditorial étudient votre texte avec soin." },
  { title: "Accompagnement éditorial", text: "Relecture, mise en page et direction artistique, main dans la main avec vous." },
  { title: "Diffusion & promotion", text: "Librairies, bibliothèques, écoles, médias et réseaux internationaux relaient votre œuvre." },
];

const MAILTO =
  "mailto:aastresnoirs@gmail.com?subject=Soumission%20de%20manuscrit&body=Titre%20de%20l'ouvrage%20%3A%0AGenre%20%3A%0APr%C3%A9sentation%20de%20l'auteur%20%3A%0A%0A(Merci%20de%20joindre%20le%20manuscrit%20en%20pi%C3%A8ce%20jointe)";

export default function Auteurs() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();

  return (
    <section className="auteurs section-pad" id="auteurs">
      <div className="wrap">
        <div className="auteurs-grid">
          <div ref={refA} className={classA}>
            <span className="eyebrow">Vous êtes auteur ?</span>
            <h2 style={{ marginTop: 14 }}>Publier chez Astres Noirs, c'est entrer dans la cour des grands.</h2>
            <ol className="step-list">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="step-text">
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div ref={refB} className={"auteurs-card " + classB}>
            <span className="eyebrow">Soumettre un manuscrit</span>
            <h3 style={{ marginTop: 12 }}>Prêt à nous confier votre texte ?</h3>
            <p>
              Joignez votre manuscrit complet, un résumé et quelques lignes sur vous. Notre comité éditorial vous
              répond dans les meilleurs délais.
            </p>
            <a className="btn btn-primary plate" href={MAILTO}>
              Envoyer un manuscrit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
