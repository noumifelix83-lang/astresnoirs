import React, { useEffect } from "react";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
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
import StructuredData from "./components/StructuredData.jsx";

export default function App() {
  /* Si l'URL contient une ancre (#boutique…), le navigateur tente d'y défiler
     avant même que React n'ait construit le contenu — on corrige au montage.
     On retire ensuite l'ancre de l'adresse : sans ça, elle reste affichée dans
     la barre du navigateur (et donc dans l'historique/les suggestions) et
     ramène systématiquement sur cette section lors des prochaines visites —
     notamment après une connexion Google, qui revient sur #auteurs. */
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <StructuredData />
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
    </AuthProvider>
  );
}
