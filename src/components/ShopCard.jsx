import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { usdApprox } from "../utils/currency.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function ShopCard({ book }) {
  const { addItem, inquire, fmt } = useCart();
  const [ref, cls] = useReveal();
  const { t, pick } = useLang();

  return (
    <article className={"shop-card " + cls} ref={ref}>
      <div className="book-cover plate" style={{ backgroundImage: `url(${book.img})` }} />
      <div className="shop-card-body">
        <span className="format-tag">{pick(book.format)}</span>
        <h3>
          {book.title}
          {book.subtitle ? " : " + pick(book.subtitle) : ""}
        </h3>
        <p className="desc">{pick(book.desc)}</p>
        <div className="buy-row">
          {book.priceKnown ? (
            <>
              <span className="price">
                {fmt(book.price)}
                <span className="eur">(≈ {usdApprox(book.price)} US)</span>
              </span>
              <button className="btn btn-primary plate btn-sm" onClick={() => addItem(book.id)}>
                {t("boutique.order")}
              </button>
            </>
          ) : (
            <>
              <span className="price price-tbd">{t("boutique.priceTbd")}</span>
              <button className="btn btn-primary plate btn-sm" onClick={() => inquire(book.id)}>
                {t("boutique.consult")}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
