import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import SloganBand from "../components/SloganBand.jsx";
import About from "../components/About.jsx";
import ArcDivider from "../components/ArcDivider.jsx";
import Collections from "../components/Collections.jsx";
import Catalogue from "../components/Catalogue.jsx";
import Boutique from "../components/Boutique.jsx";
import Auteurs from "../components/Auteurs.jsx";
import Contact from "../components/Contact.jsx";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  /* Fait défiler vers la section visée par l'ancre (#boutique…), aussi bien au
     chargement initial qu'en cliquant un lien de nav depuis une autre page ou
     depuis la page d'accueil elle-même. On retire ensuite l'ancre de l'adresse :
     sans ça, elle reste affichée (et donc dans l'historique/les suggestions du
     navigateur) et ramène systématiquement sur cette section par la suite —
     notamment après une connexion Google, qui revient sur #auteurs. */
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
    navigate(location.pathname, { replace: true });
  }, [location.hash]);

  return (
    <>
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
    </>
  );
}
