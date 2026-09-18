import React from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";

export default function Footer() {
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
            <p>Édition, impression &amp; gestion du livre — de Yaoundé à l'Afrique. Qui Lira Vivra.</p>
          </div>
          <div>
            <h5>Explorer</h5>
            <ul>
              <li><Link to="/#about">La maison</Link></li>
              <li><Link to="/#catalogue">Catalogue</Link></li>
              <li><Link to="/#boutique">Boutique</Link></li>
              <li><Link to="/#auteurs">Auteurs</Link></li>
              <li><Link to="/actualites">Actualités</Link></li>
              <li><Link to="/equipe">Équipe</Link></li>
            </ul>
          </div>
          <div>
            <h5>Collections</h5>
            <ul>
              <li><Link to="/#collections">Sapiens</Link></li>
              <li><Link to="/#collections">Calebasse</Link></li>
              <li><Link to="/#collections">Rêve d'Afrique</Link></li>
              <li><Link to="/#collections">Jeunesse</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:aastresnoirs@gmail.com">aastresnoirs@gmail.com</a></li>
              <li><a href="tel:+237696208132">696 208 132</a></li>
              <li><a href="tel:+237679635690">679 635 690</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Éditions Astres Noirs. Tous droits réservés.</span>
          <span className="footer-legal">
            <a href="/confidentialite.html">Confidentialité</a>
            <a href="/conditions.html">Conditions d'utilisation</a>
          </span>
          <span>Yaoundé, Cameroun</span>
        </div>
      </div>
    </footer>
  );
}
