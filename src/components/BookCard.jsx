import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n/LanguageContext.jsx";

/** Carte catalogue : vitrine simple, ou bouton Commander si le titre est en vente. */
export default function BookCard({ book }) {
  const { addItem, inquire } = useCart();
  const [ref, cls] = useReveal();
  const { t, pick } = useLang();

  return (
    <article className={"book-card " + cls} ref={ref}>
      <div className="book-cover plate" style={{ backgroundImage: `url(${book.img})` }}>
        <span className="tag">{pick(book.coll)}</span>
      </div>
      <div className="book-meta">
        <span className="author">{book.author}</span>
        <div className="row">
          {!book.forSale && <span className="vitrine-tag">{t("catalogue.vitrineTag")}</span>}
          {book.forSale && book.priceKnown && (
            <button className="btn btn-ghost btn-sm" onClick={() => addItem(book.id)}>
              {t("catalogue.order")}
            </button>
          )}
          {book.forSale && !book.priceKnown && (
            <button className="btn btn-ghost btn-sm" onClick={() => inquire(book.id)}>
              {t("catalogue.order")}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
