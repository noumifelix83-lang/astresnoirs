import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { books } from "../data/books.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const CartContext = createContext(null);

const STORAGE_KEY = "astres-noirs-cart";
const WHATSAPP_NUMBER = "237679635690";

const WHATSAPP_TEXT = {
  fr: {
    kindPrefix: "Livre — ",
    inquire: (label) => `Bonjour Astres Noirs, je souhaite connaître le prix et la disponibilité de « ${label} ».`,
    orderIntro: "Bonjour Astres Noirs, je souhaite commander :",
    total: "Total",
    orderOutro: "Merci de me confirmer la disponibilité et les modalités de livraison.",
  },
  en: {
    kindPrefix: "Book — ",
    inquire: (label) => `Hello Astres Noirs, I'd like to know the price and availability of “${label}”.`,
    orderIntro: "Hello Astres Noirs, I'd like to order:",
    total: "Total",
    orderOutro: "Please confirm availability and delivery details.",
  },
};

function fmt(n) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

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
  const { lang, pick } = useLang();
  const text = WHATSAPP_TEXT[lang] || WHATSAPP_TEXT.fr;

  const catalog = useMemo(() => {
    const c = {};
    books.forEach((b) => {
      if (b.forSale && b.priceKnown) {
        c[b.id] = {
          name: b.title + (b.subtitle ? " : " + pick(b.subtitle) : ""),
          kind: text.kindPrefix + b.author,
          price: b.price,
          img: b.img,
        };
      }
    });
    return c;
  }, [lang, pick, text]);

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

  const inquire = useCallback(
    (bookId) => {
      const bk = books.find((b) => b.id === bookId);
      if (!bk) return;
      const label = bk.title + (bk.subtitle ? " : " + pick(bk.subtitle) : "");
      const msg = text.inquire(label);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    },
    [pick, text]
  );

  const lines = useMemo(() => {
    return Object.keys(cart)
      .filter((id) => cart[id] > 0 && catalog[id])
      .map((id) => ({ id, qty: cart[id], ...catalog[id] }));
  }, [cart, catalog]);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const checkoutUrl = useMemo(() => {
    if (lines.length === 0) return null;
    const itemLines = lines.map((l) => `• ${l.name} x${l.qty} — ${fmt(l.price * l.qty)}`);
    const msg = text.orderIntro + "\n" + itemLines.join("\n") + "\n\n" + text.total + " : " + fmt(subtotal) + "\n\n" + text.orderOutro;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [lines, subtotal, text]);

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
