import React from "react";
import HeroCanvas from "./HeroCanvas.jsx";
import heroBg from "../assets/covers/hero-lampe-afrique.webp";
import logoIcon from "../assets/logo-icon.png";

export default function Hero() {
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
        <div className="hero-eyebrow">Édition, impression &amp; gestion du livre — Yaoundé, Cameroun</div>
        <h1>
          Chaque livre a
          <br />
          son astre.
        </h1>
        <p className="hero-slogan">
          Notre devise — « Qui Lira <em>Vivra</em> »
        </p>
        <p className="hero-lede">
          Les Éditions Astres Noirs accompagnent romanciers, poètes, essayistes, dramaturges, conteurs et fabulistes,
          de l'écriture à l'impression jusqu'aux mains du lecteur — une maison pensée pour rayonner du Cameroun à
          l'Afrique, et au-delà.
        </p>
        <div className="hero-cta">
          <a href="#catalogue" className="btn btn-primary plate">
            Découvrir le catalogue
          </a>
          <a href="#auteurs" className="btn btn-ghost">
            Publier un manuscrit
          </a>
        </div>
      </div>
      <div className="scroll-cue">
        <span className="line" /> Faire défiler
      </div>
    </header>
  );
}
