import React, { useEffect } from "react";
import { CartProvider } from "./context/CartContext.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import SloganBand from "./components/SloganBand.jsx";
import About from "./components/About.jsx";
import ArcDivider from "./components/ArcDivider.jsx";
import Collections from "./components/Collections.jsx";
import Catalogue from "./components/Catalogue.jsx";
import Boutique from "./components/Boutique.jsx";
import Auteurs from "./components/Auteurs.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

export default function App() {
  /* Si l'URL contient une ancre (#boutique…), le navigateur tente d'y défiler
     avant même que React n'ait construit le contenu — on corrige au montage. */
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) el.scrollIntoView();
  }, []);

  return (
    <CartProvider>
      <Nav />
      <Hero />
      <SloganBand />
      <main>
        <About />
        <ArcDivider />
        <Collections />
        <Catalogue />
        <ArcDivider flip />
        <Boutique />
        <Auteurs />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
