import React from "react";
import { books } from "../data/books.js";
import ShopCard from "./ShopCard.jsx";
import portrait from "../assets/covers/felix-njandja-portrait.jpg";
import { useReveal } from "../hooks/useReveal.js";

const featured = books.filter((b) => b.forSale);

export default function Boutique() {
  const [headRef, headClass] = useReveal();
  const [authorRef, authorClass] = useReveal();

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
        <div ref={authorRef} className={"shop-author " + authorClass}>
          <div className="portrait-frame" style={{ backgroundImage: `url(${portrait})` }} />
          <div>
            <span className="role">Auteur — Président Directeur Général</span>
            <h3>Félix Njandja</h3>
            <p>
              Né à Bangoua–Bangangté, dans le département du Ndé (région de l'Ouest), Félix Njandja est enseignant de
              Lettres bilingues. Dramaturge, poète, romancier et opérateur économique, il est promoteur de plusieurs
              entreprises dans divers secteurs, notamment l'éducation, l'art et la culture. Féru des traditions
              africaines et grand voyageur, il est aujourd'hui fondateur et Président Directeur Général des Éditions
              Astres Noirs — et l'auteur des six œuvres ci-dessous.
            </p>
          </div>
        </div>
        <div className="shop-grid">
          {featured.map((b) => (
            <ShopCard book={b} key={b.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
