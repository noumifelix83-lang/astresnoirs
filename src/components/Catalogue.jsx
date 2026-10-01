import React from "react";
import { books } from "../data/books.js";
import BookCard from "./BookCard.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n/LanguageContext.jsx";

/* Seuls les ouvrages avec une couverture réelle apparaissent dans le catalogue. */
const catalogueBooks = books.filter((b) => !!b.img);

export default function Catalogue() {
  const [headRef, headClass] = useReveal();
  const { t } = useLang();

  return (
    <section className="catalogue section-pad" id="catalogue">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">{t("catalogue.eyebrow")}</span>
          <h2>{t("catalogue.title")}</h2>
          <p className="lede">{t("catalogue.lede")}</p>
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
