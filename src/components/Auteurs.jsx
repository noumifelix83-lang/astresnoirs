import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { equipe } from "../data/equipe.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const MAX_FILE_MB = 20;
const STORAGE_BUCKET = "manuscripts";

function TeamCard({ member }) {
  const [ref, cls] = useReveal();
  const { pick } = useLang();
  return (
    <div ref={ref} className={"team-card " + cls}>
      <div className="team-photo" style={{ backgroundImage: `url(${member.photo})` }} />
      <div className="team-info">
        <h3>{member.name}</h3>
        {member.roles.map((r, i) => (
          <p className="team-role" key={i}>
            {pick(r)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Auteurs() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();
  const { user, loading, signInWithGoogle, signOut, isSupabaseConfigured } = useAuth();
  const { t } = useLang();

  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [fileError, setFileError] = useState("");

  const STEPS = [
    { title: t("auteurs.step1Title"), text: t("auteurs.step1Text") },
    { title: t("auteurs.step2Title"), text: t("auteurs.step2Text") },
    { title: t("auteurs.step3Title"), text: t("auteurs.step3Text") },
    { title: t("auteurs.step4Title"), text: t("auteurs.step4Text") },
  ];

  const GENRES = [
    t("auteurs.genreRoman"),
    t("auteurs.genrePoesie"),
    t("auteurs.genreEssai"),
    t("auteurs.genreTheatre"),
    t("auteurs.genreContes"),
    t("auteurs.genreFables"),
    t("auteurs.genreAutre"),
  ];

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f && f.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(t("auteurs.fileTooLarge").replace("{max}", MAX_FILE_MB));
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

      // Le serveur exige un jeton valide : seul un auteur connecté peut déclencher les e-mails.
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      await fetch("/api/submit-manuscript", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
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
            <span className="eyebrow">{t("auteurs.eyebrow")}</span>
            <h2 style={{ marginTop: 14 }}>{t("auteurs.title")}</h2>
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
            <span className="eyebrow">{t("auteurs.submitEyebrow")}</span>
            <h3 style={{ marginTop: 12 }}>{t("auteurs.submitTitle")}</h3>

            {!isSupabaseConfigured && (
              <p style={{ marginTop: 14 }}>
                {t("auteurs.notConfigured")} <a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a>.
              </p>
            )}

            {isSupabaseConfigured && loading && <p style={{ marginTop: 14 }}>{t("auteurs.loading")}</p>}

            {isSupabaseConfigured && !loading && !user && (
              <>
                <p style={{ marginTop: 14 }}>{t("auteurs.loginPrompt")}</p>
                <button type="button" className="btn btn-primary plate google-btn" onClick={signInWithGoogle} style={{ marginTop: 22 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z" />
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z" />
                    <path fill="#FBBC05" d="M3.95 10.7a5.4 5.4 0 0 1 0-3.4V4.97H.95a9 9 0 0 0 0 8.06l3-2.33Z" />
                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z" />
                  </svg>
                  {t("auteurs.googleSignIn")}
                </button>
              </>
            )}

            {isSupabaseConfigured && !loading && user && (
              <>
                <p style={{ marginTop: 14 }}>
                  {t("auteurs.connectedAs")} <strong>{user.email}</strong> ·{" "}
                  <button type="button" className="link-btn" onClick={signOut}>
                    {t("auteurs.signOut")}
                  </button>
                </p>
                <p style={{ marginTop: 6 }}>
                  <Link to="/mon-espace" className="link-btn">
                    {t("auteurs.trackLink")}
                  </Link>
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="ms-fields">
                    <div className="field">
                      <label htmlFor="ms-title">{t("auteurs.fieldTitle")}</label>
                      <input id="ms-title" name="Titre de l'ouvrage" required />
                    </div>
                    <div className="field">
                      <label htmlFor="ms-genre">{t("auteurs.fieldGenre")}</label>
                      <select id="ms-genre" name="Genre" required defaultValue="">
                        <option value="" disabled>
                          {t("auteurs.fieldGenreChoose")}
                        </option>
                        {GENRES.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="ms-summary">{t("auteurs.fieldSummary")}</label>
                      <textarea
                        id="ms-summary"
                        name="message"
                        required
                        placeholder={t("auteurs.fieldSummaryPlaceholder")}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="ms-file">
                        {t("auteurs.fieldFile")} ({MAX_FILE_MB} {t("auteurs.fieldFileHint")})
                      </label>
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
                    {status === "sending" ? t("auteurs.sending") : t("auteurs.submit")}
                  </button>

                  {status === "done" && <p className="form-note form-note-ok">{t("auteurs.successMsg")}</p>}
                  {status === "error" && (
                    <p className="form-note form-note-error">
                      {t("auteurs.errorMsg")} <a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a>.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>

        <div className="auteurs-team">
          <span className="eyebrow">{t("auteurs.teamEyebrow")}</span>
          <h3 style={{ marginTop: 10 }}>{t("auteurs.teamTitle")}</h3>
          <div className="team-grid">
            {equipe.map((m) => (
              <TeamCard member={m} key={m.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
