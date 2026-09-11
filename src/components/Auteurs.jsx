import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";

const STEPS = [
  { title: "Envoi du manuscrit", text: "Roman, poésie, essai, théâtre, conte ou fable — envoyez votre texte complet via le formulaire." },
  { title: "Comité de lecture", text: "Cinq relecteurs et le comité éditorial étudient votre texte avec soin." },
  { title: "Accompagnement éditorial", text: "Relecture, mise en page et direction artistique, main dans la main avec vous." },
  { title: "Diffusion & promotion", text: "Librairies, bibliothèques, écoles, médias et réseaux internationaux relaient votre œuvre." },
];

const GENRES = ["Roman", "Poésie", "Essai", "Théâtre", "Contes", "Fables", "Autre"];

/* Clé gratuite à obtenir sur web3forms.com (aucun compte à créer, juste une adresse
   e-mail à confirmer) — le formulaire lui envoie directement les soumissions par courriel,
   pièce jointe comprise, sans backend à héberger. À remplacer avant mise en service. */
const WEB3FORMS_ACCESS_KEY = "REMPLACER_PAR_LA_CLE_WEB3FORMS";
const MAX_FILE_MB = 5;

export default function Auteurs() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [fileError, setFileError] = useState("");

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f && f.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(
        `Ce fichier dépasse ${MAX_FILE_MB} Mo. Compressez-le, ou indiquez un lien de téléchargement (Google Drive, WeTransfer…) dans le résumé ci-dessus.`
      );
      e.target.value = "";
    } else {
      setFileError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (fileError) return;
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", "Nouvelle soumission de manuscrit — Astres Noirs");
    data.append("from_name", "Formulaire Astres Noirs");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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

          <form ref={refB} className={"auteurs-card " + classB} onSubmit={handleSubmit}>
            <span className="eyebrow">Soumettre un manuscrit</span>
            <h3 style={{ marginTop: 12 }}>Prêt à nous confier votre texte ?</h3>
            <p>
              Remplissez ce formulaire et joignez votre manuscrit complet. Notre comité éditorial vous répond dans
              les meilleurs délais.
            </p>

            {/* Piège à robots, invisible pour un humain */}
            <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />

            <div className="ms-fields">
              <div className="field">
                <label htmlFor="ms-name">Nom complet</label>
                <input id="ms-name" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="ms-email">Courriel</label>
                <input id="ms-email" name="email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="ms-title">Titre de l'ouvrage</label>
                <input id="ms-title" name="Titre de l'ouvrage" required />
              </div>
              <div className="field">
                <label htmlFor="ms-genre">Genre</label>
                <select id="ms-genre" name="Genre" required defaultValue="">
                  <option value="" disabled>
                    Choisir…
                  </option>
                  {GENRES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="ms-summary">Résumé &amp; présentation de l'auteur</label>
                <textarea
                  id="ms-summary"
                  name="message"
                  required
                  placeholder="Résumé de l'œuvre, et quelques lignes sur vous…"
                />
              </div>
              <div className="field">
                <label htmlFor="ms-file">Manuscrit ({MAX_FILE_MB} Mo max — PDF ou Word)</label>
                <input
                  id="ms-file"
                  name="attachment"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                />
                {fileError && <span className="field-error">{fileError}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary plate"
              disabled={status === "sending" || !!fileError}
              style={{ marginTop: 22 }}
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer le manuscrit"}
            </button>

            {status === "done" && (
              <p className="form-note form-note-ok">
                Merci ! Votre manuscrit a bien été transmis à notre comité éditorial, qui reviendra vers vous
                rapidement.
              </p>
            )}
            {status === "error" && (
              <p className="form-note form-note-error">
                Une erreur est survenue lors de l'envoi. Réessayez, ou écrivez-nous directement à{" "}
                <a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a>.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
