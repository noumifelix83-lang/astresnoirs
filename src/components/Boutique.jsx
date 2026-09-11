import React from "react";
import { books } from "../data/books.js";
import ShopCard from "./ShopCard.jsx";
import portrait from "../assets/covers/felix-njandja-portrait.webp";
import logoIcon from "../assets/logo-icon.png";
import { useReveal } from "../hooks/useReveal.js";

const featured = books.filter((b) => b.forSale);

const TRUST_POINTS = [
  {
    title: "Livraison internationale",
    text: "Depuis Yaoundé vers les États-Unis, l'Europe et au-delà — mode d'envoi et délai confirmés avec vous après la commande.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
      </svg>
    ),
  },
  {
    title: "Commande directe, sans détour",
    text: "Chaque commande est confirmée personnellement via WhatsApp avec l'éditeur — pas de compte à créer, pas de formulaire.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 20l1.05-5.4A8.5 8.5 0 1 1 21 11.5Z" />
      </svg>
    ),
  },
  {
    title: "Papier & numérique",
    text: "Plusieurs titres existent aussi en édition Kindle, disponible instantanément où que vous soyez.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 5.5c2-1 4.5-1 7 0v13c-2.5-1-5-1-7 0v-13ZM20 5.5c-2-1-4.5-1-7 0v13c2.5-1 5-1 7 0v-13Z" />
      </svg>
    ),
  },
  {
    title: "Paiement adapté à votre pays",
    text: "Les modalités de règlement (Mobile Money, virement, ou autre selon votre pays) vous sont proposées au moment de la confirmation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
];

export default function Boutique() {
  const [headRef, headClass] = useReveal();
  const [authorRef, authorClass] = useReveal();
  const [trustRef, trustClass] = useReveal();

  return (
    <section className="boutique section-pad" id="boutique">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">Boutique</span>
          <h2>Six œuvres, un seul auteur en vente directe.</h2>
          <p className="lede">
            La boutique est aujourd'hui réservée à l'auteur qui a fondé la maison. Le reste de notre catalogue
            rejoindra la vente en ligne au fil de sa mise en distribution numérique.
          </p>
        </div>
        <div ref={authorRef} className={"founder-spotlight " + authorClass}>
          <div className="founder-portrait">
            <div className="founder-portrait-img" style={{ backgroundImage: `url(${portrait})` }} />
            <img className="founder-seal" src={logoIcon} alt="" aria-hidden="true" />
          </div>
          <div className="founder-copy">
            <span className="role">Auteur — Président Directeur Général</span>
            <h3>Félix Njandja</h3>
            <p className="founder-signature-line">Fondateur des Éditions Astres Noirs</p>
            <p>
              Né à Bangoua–Bangangté, dans le département du Ndé (région de l'Ouest), Félix Njandja est enseignant de
              Lettres bilingues. Dramaturge, poète, romancier et opérateur économique, il est promoteur de plusieurs
              entreprises dans divers secteurs, notamment l'éducation, l'art et la culture. Féru des traditions
              africaines et grand voyageur, il est aujourd'hui fondateur et Président Directeur Général des Éditions
              Astres Noirs — et l'auteur des six œuvres ci-dessous.
            </p>
            <p className="founder-quote">« Qui Lira Vivra. »</p>
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
