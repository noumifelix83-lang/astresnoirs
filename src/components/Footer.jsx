import React from "react";
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
            <p>Maison d'édition généraliste basée à Yaoundé. Qui Lira Vivra.</p>
          </div>
          <div>
            <h5>Explorer</h5>
            <ul>
              <li><a href="#about">La maison</a></li>
              <li><a href="#catalogue">Catalogue</a></li>
              <li><a href="#boutique">Boutique</a></li>
              <li><a href="#auteurs">Auteurs</a></li>
            </ul>
          </div>
          <div>
            <h5>Collections</h5>
            <ul>
              <li><a href="#collections">Sapiens</a></li>
              <li><a href="#collections">Calebasse</a></li>
              <li><a href="#collections">Rêve d'Afrique</a></li>
              <li><a href="#collections">Jeunesse</a></li>
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
          <span>Yaoundé, Cameroun</span>
        </div>
      </div>
    </footer>
  );
}
