import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Contact() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { t } = useLang();

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = form.subject || t("contact.defaultSubject");
    const body = `Nom : ${form.name}\nCourriel : ${form.email}\n\n${form.message}`;
    window.location.href =
      "mailto:aastresnoirs@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div ref={refA} className={classA}>
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2 style={{ marginTop: 14 }}>{t("contact.title")}</h2>
          <p className="lede" style={{ marginTop: 14 }}>
            {t("contact.lede")}
          </p>
          <div className="contact-list">
            <div className="contact-item">
              <span className="eyebrow">{t("contact.addressLabel")}</span>
              <p>{t("contact.address")}</p>
            </div>
            <div className="contact-item">
              <span className="eyebrow">{t("contact.phoneLabel")}</span>
              <a href="tel:+237696208132">+237 696 208 132</a>
              <br />
              <a href="tel:+237679635690">+237 679 635 690</a>
            </div>
            <div className="contact-item">
              <span className="eyebrow">{t("contact.emailLabel")}</span>
              <a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a>
            </div>
          </div>
        </div>
        <form ref={refB} className={classB} onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="cf-name">{t("contact.fieldName")}</label>
            <input id="cf-name" value={form.name} onChange={update("name")} required />
          </div>
          <div className="field">
            <label htmlFor="cf-email">{t("contact.fieldEmail")}</label>
            <input id="cf-email" type="email" value={form.email} onChange={update("email")} required />
          </div>
          <div className="field">
            <label htmlFor="cf-subject">{t("contact.fieldSubject")}</label>
            <input
              id="cf-subject"
              value={form.subject}
              onChange={update("subject")}
              placeholder={t("contact.fieldSubjectPlaceholder")}
            />
          </div>
          <div className="field">
            <label htmlFor="cf-message">{t("contact.fieldMessage")}</label>
            <textarea id="cf-message" value={form.message} onChange={update("message")} required />
          </div>
          <button type="submit" className="btn btn-primary plate btn-block">
            {t("contact.submit")}
          </button>
          <p className="form-note">{t("contact.note")}</p>
        </form>
      </div>
    </section>
  );
}
