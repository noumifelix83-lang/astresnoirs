import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function ShopCard({ book }) {
  const { addItem, inquire, fmt } = useCart();
  const [ref, cls] = useReveal();

  return (
    <article className={"shop-card " + cls} ref={ref}>
      <div className="book-cover plate" style={{ backgroundImage: `url(${book.img})` }} />
      <div className="shop-card-body">
        <span className="format-tag">{book.format}</span>
        <h3>
          {book.title}
          {book.subtitle ? " : " + book.subtitle : ""}
        </h3>
        <p className="desc">{book.desc}</p>
        <div className="buy-row">
          {book.priceKnown ? (
            <>
              <span className="price">
                {fmt(book.price)}
                <span className="eur">({book.priceEur})</span>
              </span>
              <button className="btn btn-primary plate btn-sm" onClick={() => addItem(book.id)}>
                Commander
              </button>
            </>
          ) : (
            <>
              <span className="price price-tbd">Prix sur demande</span>
              <button className="btn btn-primary plate btn-sm" onClick={() => inquire(book.id)}>
                Nous consulter
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
