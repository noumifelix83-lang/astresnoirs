import React from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { t, lang } = useLang();
  const legalSuffix = lang === "en" ? "-en" : "";
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">
                <img src={logoIcon} alt="Astres Noirs" />
              </span>
              <span className="brand-word">Astres Noirs</span>
            </div>
            <p>{t("footer.tagline")}</p>
          </div>
          <div>
            <h5>{t("footer.exploreHeading")}</h5>
            <ul>
              <li><Link to="/#about">{t("nav.about")}</Link></li>
              <li><Link to="/#catalogue">{t("nav.catalogue")}</Link></li>
              <li><Link to="/#boutique">{t("nav.boutique")}</Link></li>
              <li><Link to="/#auteurs">{t("nav.auteurs")}</Link></li>
              <li><Link to="/actualites">{t("nav.actualites")}</Link></li>
            </ul>
          </div>
          <div>
            <h5>{t("footer.collectionsHeading")}</h5>
            <ul>
              <li><Link to="/#collections">Sapiens</Link></li>
              <li><Link to="/#collections">Calebasse</Link></li>
              <li><Link to="/#collections">Rêve d'Afrique</Link></li>
              <li><Link to="/#collections">Jeunesse</Link></li>
            </ul>
          </div>
          <div>
            <h5>{t("footer.contactHeading")}</h5>
            <ul>
              <li><a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a></li>
              <li><a href="tel:+237696208132">696 208 132</a></li>
              <li><a href="tel:+237679635690">679 635 690</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Éditions Astres Noirs. {t("footer.rights")}</span>
          <span className="footer-legal">
            <a href={`/confidentialite${legalSuffix}.html`}>{t("footer.privacy")}</a>
            <a href={`/conditions${legalSuffix}.html`}>{t("footer.terms")}</a>
          </span>
          <span>{t("footer.location")}</span>
        </div>
      </div>
    </footer>
  );
}
