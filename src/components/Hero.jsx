import React from "react";
import HeroCanvas from "./HeroCanvas.jsx";
import heroBg from "../assets/covers/hero-lampe-afrique.webp";
import logoIcon from "../assets/logo-icon.png";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Hero() {
  const { t } = useLang();
  return (
    <header className="hero" id="hero">
      <div className="hero-slideshow" aria-hidden="true">
        <img className="hero-slide is-active" src={heroBg} alt="" />
      </div>
      <HeroCanvas />
      <div className="hero-veil" />
      <div className="hero-inner">
        <div className="hero-badge">
          <img src={logoIcon} alt="Astres Noirs" />
        </div>
        <div className="hero-eyebrow">{t("hero.eyebrow")}</div>
        <h1>
          {t("hero.titleLine1")}
          <br />
          {t("hero.titleLine2")}
        </h1>
        <p className="hero-slogan">
          {t("hero.sloganLabel")} — « {t("hero.sloganWord")} <em>{t("hero.sloganEm")}</em> »
        </p>
        <p className="hero-lede">{t("hero.lede")}</p>
        <div className="hero-cta">
          <a href="#catalogue" className="btn btn-primary plate">
            {t("hero.ctaCatalogue")}
          </a>
          <a href="#auteurs" className="btn btn-ghost">
            {t("hero.ctaPublish")}
          </a>
        </div>
      </div>
      <div className="scroll-cue">
        <span className="line" /> {t("hero.scrollCue")}
      </div>
    </header>
  );
}
