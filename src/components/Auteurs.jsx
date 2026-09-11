import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";

const STEPS = [
  { title: "Connexion", text: "Connectez-vous avec votre compte Google — cela nous permet de vous identifier et de suivre votre dossier." },
  { title: "Envoi du manuscrit", text: "Roman, poésie, essai, théâtre, conte ou fable — envoyez votre texte complet via le formulaire." },
  { title: "Comité de lecture", text: "Cinq relecteurs et le comité éditorial étudient votre texte avec soin." },
  { title: "Accompagnement éditorial", text: "Relecture, mise en page, direction artistique et diffusion, main dans la main avec vous." },
];

const GENRES = ["Roman", "Poésie", "Essai", "Théâtre", "Contes", "Fables", "Autre"];
const MAX_FILE_MB = 20;
const STORAGE_BUCKET = "manuscripts";

export default function Auteurs() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();
  const { user, loading, signInWithGoogle, signOut, isSupabaseConfigured } = useAuth();

  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [fileError, setFileError] = useState("");

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f && f.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`Ce fichier dépasse ${MAX_FILE_MB} Mo. Merci de le compresser avant l'envoi.`);
      e.target.value = "";
    } else {
      setFileError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (fileError || !user) return;
    const form = e.target;
    const fd = new FormData(form);
    const file = form.querySelector("#ms-file").files[0];
    if (!file) return;

    const title = fd.get("Titre de l'ouvrage");
    const genre = fd.get("Genre");
    const message = fd.get("message");

    setStatus("sending");
    try {
      const safeName = file.name.replace(/[^\w.\-]+/g, "_");
      const path = `${user.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
        contentType: file.type || "application/octet-stream",
      });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("manuscripts").insert({
        user_id: user.id,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
        email: user.email,
        title,
        genre,
        message,
        file_path: path,
        status: "nouveau",
      });
      if (insertError) throw insertError;

      // Notification par e-mail au comité éditorial, avec un lien temporaire vers le fichier.
      const { data: signedUrlData } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(path, 60 * 60 * 24 * 30);

      await fetch("/api/submit-manuscript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
          email: user.email,
          title,
          genre,
          message,
          fileName: file.name,
          fileUrl: signedUrlData?.signedUrl || null,
        }),
      }).catch(() => {
        /* La soumission est déjà enregistrée dans Supabase : une notification manquée
           n'est pas bloquante, le comité éditorial consultera la base directement. */
      });

      setStatus("done");
      form.reset();
    } catch (err) {
      console.error("Erreur de soumission :", err);
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

          <div ref={refB} className={"auteurs-card " + classB}>
            <span className="eyebrow">Soumettre un manuscrit</span>
            <h3 style={{ marginTop: 12 }}>Prêt à nous confier votre texte ?</h3>

            {!isSupabaseConfigured && (
              <p style={{ marginTop: 14 }}>
                La connexion auteur est en cours de mise en place. Revenez très bientôt, ou écrivez-nous directement
                à <a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a>.
              </p>
            )}

            {isSupabaseConfigured && loading && <p style={{ marginTop: 14 }}>Chargement…</p>}

            {isSupabaseConfigured && !loading && !user && (
              <>
                <p style={{ marginTop: 14 }}>
                  Connectez-vous avec votre compte Google pour soumettre votre manuscrit. Cela nous permet de vous
                  identifier et de suivre votre dossier au fil de l'évaluation éditoriale.
                </p>
                <button type="button" className="btn btn-primary plate google-btn" onClick={signInWithGoogle} style={{ marginTop: 22 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z" />
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z" />
                    <path fill="#FBBC05" d="M3.95 10.7a5.4 5.4 0 0 1 0-3.4V4.97H.95a9 9 0 0 0 0 8.06l3-2.33Z" />
                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z" />
                  </svg>
                  Se connecter avec Google
                </button>
              </>
            )}

            {isSupabaseConfigured && !loading && user && (
              <>
                <p style={{ marginTop: 14 }}>
                  Connecté en tant que <strong>{user.email}</strong> ·{" "}
                  <button type="button" className="link-btn" onClick={signOut}>
                    se déconnecter
                  </button>
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="ms-fields">
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
