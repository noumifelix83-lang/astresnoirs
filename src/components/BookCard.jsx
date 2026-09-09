import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useReveal } from "../hooks/useReveal.js";

/** Carte catalogue : vitrine simple, ou bouton Commander si le titre est en vente. */
export default function BookCard({ book }) {
  const { addItem, inquire } = useCart();
  const [ref, cls] = useReveal();

  return (
    <article className={"book-card " + cls} ref={ref}>
      <div className="book-cover plate" style={{ backgroundImage: `url(${book.img})` }}>
        <span className="tag">{book.coll}</span>
      </div>
      <div className="book-meta">
        <span className="author">{book.author}</span>
        <div className="row">
          {!book.forSale && <span className="vitrine-tag">Disponible en librairie</span>}
          {book.forSale && book.priceKnown && (
            <button className="btn btn-ghost btn-sm" onClick={() => addItem(book.id)}>
              Commander
            </button>
          )}
          {book.forSale && !book.priceKnown && (
            <button className="btn btn-ghost btn-sm" onClick={() => inquire(book.id)}>
              Commander
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
