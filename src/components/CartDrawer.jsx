import React, { useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { usdApprox } from "../utils/currency.js";

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, incItem, decItem, removeItem, clearCart, checkoutUrl, fmt } =
    useCart();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeCart();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <>
      <div className={"overlay" + (isOpen ? " is-open" : "")} onClick={closeCart} />
      <aside className={"drawer" + (isOpen ? " is-open" : "")} aria-label="Panier">
        <div className="drawer-head">
          <h3>Votre panier</h3>
          <button className="drawer-close" aria-label="Fermer le panier" onClick={closeCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <div className="drawer-body">
          {lines.length === 0 ? (
            <p className="cart-empty">
              Votre panier est vide pour le moment. Rendez-vous dans la boutique pour ajouter un ouvrage à votre
              commande.
            </p>
          ) : (
            lines.map((l) => (
              <div className="cart-line" key={l.id}>
                <div className="swatch" style={{ backgroundImage: `url(${l.img})` }} />
                <div className="cart-line-info">
                  <span className="name">{l.name}</span>
                  <span className="kind">{l.kind}</span>
                  <div className="qty-row">
                    <button className="qty-btn" aria-label="Diminuer la quantité" onClick={() => decItem(l.id)}>
                      −
                    </button>
                    <span className="qty-val">{l.qty}</span>
                    <button className="qty-btn" aria-label="Augmenter la quantité" onClick={() => incItem(l.id)}>
                      +
                    </button>
                    <button className="line-remove" onClick={() => removeItem(l.id)}>
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer-foot">
          <div className="subtotal-row">
            <span>Sous-total</span>
            <span className="amt">
              {fmt(subtotal)}
              {subtotal > 0 && <span className="eur"> (≈ {usdApprox(subtotal)} US)</span>}
            </span>
          </div>
          <a
            className="btn btn-primary plate btn-block"
            href={checkoutUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!checkoutUrl}
            style={checkoutUrl ? undefined : { pointerEvents: "none", opacity: 0.5 }}
          >
            Commander via WhatsApp
          </a>
          <button className="btn btn-ghost btn-block" onClick={clearCart}>
            Vider le panier
          </button>
        </div>
      </aside>
    </>
  );
}
