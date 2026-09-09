import React, { useEffect, useState } from "react";
import HeroCanvas from "./HeroCanvas.jsx";
import { books, heroSlideIds } from "../data/books.js";
import logoIcon from "../assets/logo-icon.png";
import { prefersReducedMotion } from "../hooks/useReveal.js";

const slides = heroSlideIds
  .map((id) => books.find((b) => b.id === id))
  .filter(Boolean);

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1 || prefersReducedMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hero" id="hero">
      <div className="hero-slideshow" aria-hidden="true">
        {slides.map((b, i) => (
          <img
            key={b.id}
            className={"hero-slide" + (i === active ? " is-active" : "")}
            src={b.img}
            alt=""
          />
        ))}
      </div>
      <HeroCanvas />
      <div className="hero-veil" />
      <div className="hero-inner">
        <div className="hero-badge">
          <img src={logoIcon} alt="Astres Noirs" />
        </div>
        <div className="hero-eyebrow">Maison d'édition — Yaoundé, Cameroun</div>
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
          de l'écriture jusqu'aux mains du lecteur — au Cameroun et au-delà.
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
