import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";

export default function Contact() {
  const [refA, classA] = useReveal();
  const [refB, classB] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = form.subject || "Message depuis le site";
    const body = `Nom : ${form.name}\nCourriel : ${form.email}\n\n${form.message}`;
    window.location.href =
      "mailto:aastresnoirs@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div ref={refA} className={classA}>
          <span className="eyebrow">Contact</span>
          <h2 style={{ marginTop: 14 }}>Parlons de votre projet.</h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Auteurs, libraires, partenaires ou lecteurs curieux — nous vous répondons volontiers.
          </p>
          <div className="contact-list">
            <div className="contact-item">
              <span className="eyebrow">Adresse</span>
              <p>Yaoundé, Cameroun</p>
            </div>
            <div className="contact-item">
              <span className="eyebrow">Téléphone</span>
              <a href="tel:+237696208132">+237 696 208 132</a>
              <br />
              <a href="tel:+237679635690">+237 679 635 690</a>
            </div>
            <div className="contact-item">
              <span className="eyebrow">Courriel</span>
              <a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a>
            </div>
          </div>
        </div>
        <form ref={refB} className={classB} onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="cf-name">Nom</label>
            <input id="cf-name" value={form.name} onChange={update("name")} required />
          </div>
          <div className="field">
            <label htmlFor="cf-email">Courriel</label>
            <input id="cf-email" type="email" value={form.email} onChange={update("email")} required />
          </div>
          <div className="field">
            <label htmlFor="cf-subject">Objet</label>
            <input
              id="cf-subject"
              value={form.subject}
              onChange={update("subject")}
              placeholder="Manuscrit, partenariat, commande…"
            />
          </div>
          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" value={form.message} onChange={update("message")} required />
          </div>
          <button type="submit" className="btn btn-primary plate btn-block">
            Envoyer le message
          </button>
          <p className="form-note">
            L'envoi ouvre votre messagerie, préremplie à destination de aastresnoirs@gmail.com.
          </p>
        </form>
      </div>
    </section>
  );
}
