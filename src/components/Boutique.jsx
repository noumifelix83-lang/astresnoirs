import React from "react";
import { books } from "../data/books.js";
import ShopCard from "./ShopCard.jsx";
import portrait from "../assets/covers/felix-njandja-portrait.webp";
import logoIcon from "../assets/logo-icon.png";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const featured = books.filter((b) => b.forSale);

export default function Boutique() {
  const [headRef, headClass] = useReveal();
  const [authorRef, authorClass] = useReveal();
  const [trustRef, trustClass] = useReveal();
  const { t } = useLang();

  const TRUST_POINTS = [
    {
      title: t("boutique.trust1Title"),
      text: t("boutique.trust1Text"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
        </svg>
      ),
    },
    {
      title: t("boutique.trust2Title"),
      text: t("boutique.trust2Text"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 20l1.05-5.4A8.5 8.5 0 1 1 21 11.5Z" />
        </svg>
      ),
    },
    {
      title: t("boutique.trust3Title"),
      text: t("boutique.trust3Text"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 5.5c2-1 4.5-1 7 0v13c-2.5-1-5-1-7 0v-13ZM20 5.5c-2-1-4.5-1-7 0v13c2.5-1 5-1 7 0v-13Z" />
        </svg>
      ),
    },
    {
      title: t("boutique.trust4Title"),
      text: t("boutique.trust4Text"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
        </svg>
      ),
    },
  ];

  return (
    <section className="boutique section-pad" id="boutique">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">{t("boutique.eyebrow")}</span>
          <h2>{t("boutique.title")}</h2>
          <p className="lede">{t("boutique.lede")}</p>
        </div>
        <div ref={authorRef} className={"founder-spotlight " + authorClass}>
          <div className="founder-portrait">
            <div className="founder-portrait-img" style={{ backgroundImage: `url(${portrait})` }} />
            <img className="founder-seal" src={logoIcon} alt="" aria-hidden="true" />
          </div>
          <div className="founder-copy">
            <span className="role">{t("boutique.founderRole")}</span>
            <h3>Félix Njandja</h3>
            <p className="founder-signature-line">{t("boutique.founderSignature")}</p>
            <p>{t("boutique.founderBio")}</p>
            <p className="founder-quote">{t("boutique.founderQuote")}</p>
          </div>
        </div>
        <div className="shop-grid">
          {featured.map((b) => (
            <ShopCard book={b} key={b.id} />
          ))}
        </div>
        <div ref={trustRef} className={"trust-band " + trustClass}>
          {TRUST_POINTS.map((p) => (
            <div className="trust-item" key={p.title}>
              <span className="trust-icon">{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
