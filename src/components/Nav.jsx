import React, { useEffect, useState } from "react";
import logoIcon from "../assets/logo-icon.png";
import { useCart } from "../context/CartContext.jsx";

const LINKS = [
  { href: "#about", label: "La maison" },
  { href: "#collections", label: "Collections" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#boutique", label: "Boutique" },
  { href: "#auteurs", label: "Auteurs" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " is-scrolled" : "")} id="nav">
      <a className="brand" href="#hero">
        <span className="brand-mark">
          <img src={logoIcon} alt="Astres Noirs" />
        </span>
        <span className="brand-word">
          Astres Noirs
          <small>Éditions</small>
        </span>
      </a>

      <ul className={"nav-links" + (menuOpen ? " is-open" : "")} id="navLinks">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button className="icon-btn" aria-label="Ouvrir le panier" onClick={openCart}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
            <circle cx="10" cy="21" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="17" cy="21" r="1.3" fill="currentColor" stroke="none" />
          </svg>
          <span className="cart-count" data-empty={count === 0 ? "true" : "false"}>
            {count}
          </span>
        </button>
        <button
          className="menu-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen ? "true" : "false"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
