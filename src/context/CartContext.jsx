import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { books } from "../data/books.js";

const CartContext = createContext(null);

const STORAGE_KEY = "astres-noirs-cart";
const WHATSAPP_NUMBER = "237679635690";

function fmt(n) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

const catalog = {};
books.forEach((b) => {
  if (b.forSale && b.priceKnown) {
    catalog[b.id] = {
      name: b.title + (b.subtitle ? " : " + b.subtitle : ""),
      kind: "Livre — " + b.author,
      price: b.price,
      img: b.img,
    };
  }
});

function readInitialCart() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* stockage indisponible : on continue sans persister */
    }
  }, [cart]);

  const addItem = useCallback((id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setIsOpen(true);
  }, []);

  const incItem = useCallback((id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const decItem = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) };
      return next;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const inquire = useCallback((bookId) => {
    const bk = books.find((b) => b.id === bookId);
    if (!bk) return;
    const label = bk.title + (bk.subtitle ? " : " + bk.subtitle : "");
    const msg = `Bonjour Astres Noirs, je souhaite connaître le prix et la disponibilité de « ${label} ».`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }, []);

  const lines = useMemo(() => {
    return Object.keys(cart)
      .filter((id) => cart[id] > 0 && catalog[id])
      .map((id) => ({ id, qty: cart[id], ...catalog[id] }));
  }, [cart]);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const checkoutUrl = useMemo(() => {
    if (lines.length === 0) return null;
    const itemLines = lines.map((l) => `• ${l.name} x${l.qty} — ${fmt(l.price * l.qty)}`);
    const msg =
      "Bonjour Astres Noirs, je souhaite commander :\n" +
      itemLines.join("\n") +
      "\n\nTotal : " +
      fmt(subtotal) +
      "\n\nMerci de me confirmer la disponibilité et les modalités de livraison.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [lines, subtotal]);

  const value = {
    lines,
    subtotal,
    count,
    isOpen,
    fmt,
    checkoutUrl,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    incItem,
    decItem,
    removeItem,
    clearCart,
    inquire,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
