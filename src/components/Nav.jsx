import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { user, isStaff } = useAuth();
  const { pathname } = useLocation();
  const { t, toggleLang } = useLang();
  /* Seule la page d'accueil a une bannière sombre en tête de page : ailleurs,
     le fond est clair dès le premier pixel, donc la nav doit toujours être
     dans son état « scrolled » (icônes et texte foncés), sous peine d'être
     invisible (blanc sur fond clair). */
  const onHome = pathname === "/";

  const LINKS = [
    { href: "/#about", label: t("nav.about") },
    { href: "/#collections", label: t("nav.collections") },
    { href: "/#catalogue", label: t("nav.catalogue") },
    { href: "/#boutique", label: t("nav.boutique") },
    { href: "/#auteurs", label: t("nav.auteurs") },
    { href: "/actualites", label: t("nav.actualites") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, [onHome]);

  return (
    <nav className={"nav" + (scrolled || !onHome ? " is-scrolled" : "")} id="nav">
      <Link className="brand" to="/#hero">
        <span className="brand-mark">
          <img src={logoIcon} alt="Astres Noirs" />
        </span>
        <span className="brand-word">
          {t("nav.brandWord")}
          <small>{t("nav.brandSub")}</small>
        </span>
      </Link>

      <ul className={"nav-links" + (menuOpen ? " is-open" : "")} id="navLinks">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link to={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        {isStaff && (
          <Link className="icon-btn" to="/tableau-de-bord" aria-label={t("nav.dashboardAria")} title={t("nav.dashboardAria")}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
          </Link>
        )}
        {user && (
          <Link className="icon-btn" to="/mon-espace" aria-label={t("nav.monEspaceAria")} title={t("nav.monEspaceAria")}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          </Link>
        )}
        <button className="icon-btn" aria-label={t("nav.cartAria")} onClick={openCart}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
            <circle cx="10" cy="21" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="17" cy="21" r="1.3" fill="currentColor" stroke="none" />
          </svg>
          <span className="cart-count" data-empty={count === 0 ? "true" : "false"}>
            {count}
          </span>
        </button>
        <button type="button" className="icon-btn lang-toggle" aria-label={t("nav.langToggleAria")} title={t("nav.langToggleAria")} onClick={toggleLang}>
          {t("nav.langToggleLabel")}
        </button>
        <button
          className="menu-toggle"
          aria-label={t("nav.menuAria")}
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
