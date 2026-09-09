import React from "react";
import { books } from "../data/books.js";
import BookCard from "./BookCard.jsx";
import { useReveal } from "../hooks/useReveal.js";

/* Seuls les ouvrages avec une couverture réelle apparaissent dans le catalogue. */
const catalogueBooks = books.filter((b) => !!b.img);

export default function Catalogue() {
  const [headRef, headClass] = useReveal();

  return (
    <section className="catalogue section-pad" id="catalogue">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">Catalogue</span>
          <h2>Une sélection de nos ouvrages.</h2>
          <p className="lede">
            Notre catalogue se parcourt librement ici. Les titres déjà disponibles à l'achat portent la mention «
            Commander ».
          </p>
        </div>
        <div className="book-grid">
          {catalogueBooks.map((b) => (
            <BookCard book={b} key={b.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
