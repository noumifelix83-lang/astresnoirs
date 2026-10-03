import React from "react";
import { books } from "../data/books.js";

const SITE_URL = "https://www.astresnoirs.net/";

/**
 * Données structurées Schema.org (JSON-LD), invisibles à l'écran mais lues par Google :
 * aident à faire apparaître le nom de la maison, le logo et les livres (prix, disponibilité)
 * directement dans les résultats de recherche.
 */
export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE_URL + "#organization",
    name: "Éditions Astres Noirs",
    alternateName: "Astres Noirs",
    url: SITE_URL,
    logo: SITE_URL + "icon-512.png?v=2",
    slogan: "Qui Lira Vivra",
    email: "aastresnoirs@gmail.com",
    telephone: "+237679635690",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    description:
      "Maison d'édition, d'impression et de gestion du livre basée à Yaoundé, Cameroun, rayonnant du Cameroun à l'Afrique. Catalogue de livres (romans, poésie, essais, théâtre, contes, fables) et boutique en ligne.",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_URL + "#website",
    url: SITE_URL,
    name: "Éditions Astres Noirs",
    publisher: { "@id": SITE_URL + "#organization" },
    inLanguage: "fr",
  };

  const bookItems = books
    .filter((b) => !!b.img)
    .map((b, i) => {
      const subtitle = typeof b.subtitle === "object" ? b.subtitle.fr : b.subtitle;
      const format = typeof b.format === "object" ? b.format.fr : b.format;
      const desc = typeof b.desc === "object" ? b.desc.fr : b.desc;
      const entry = {
        "@type": "Book",
        position: i + 1,
        name: b.title + (subtitle ? " : " + subtitle : ""),
        author: { "@type": "Person", name: b.author },
        genre: b.genre,
        isbn: b.isbn || undefined,
        bookFormat: format === "Format Kindle" ? "https://schema.org/EBook" : "https://schema.org/Paperback",
        publisher: { "@id": SITE_URL + "#organization" },
        image: SITE_URL,
        description: desc,
      };
      if (b.forSale && b.priceKnown) {
        entry.offers = {
          "@type": "Offer",
          priceCurrency: "XAF",
          price: b.price,
          availability: "https://schema.org/InStock",
          url: SITE_URL + "#boutique",
        };
      }
      return entry;
    });

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: bookItems,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment envoyer mon manuscrit à la maison d'édition Astres Noirs ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les Éditions Astres Noirs n'acceptent plus les manuscrits envoyés par simple e-mail. Pour soumettre un manuscrit, rendez-vous sur astresnoirs.net, section « Vous êtes auteur ? », connectez-vous avec votre compte Google, puis remplissez le formulaire (titre, genre, résumé et fichier PDF ou Word). Vous recevez une confirmation automatique et pouvez suivre l'avancement de votre dossier en temps réel depuis votre espace auteur.",
        },
      },
      {
        "@type": "Question",
        name: "How do I submit my manuscript to Éditions Astres Noirs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Éditions Astres Noirs no longer accepts manuscripts sent by plain email. To submit a manuscript, go to astresnoirs.net, to the \"Are you an author?\" section, sign in with your Google account, then fill out the form (title, genre, summary and a PDF or Word file). You'll receive an automatic confirmation and can track your submission's progress in real time from your author space.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      <script type="application/ld+json">{JSON.stringify(faq)}</script>
    </>
  );
}
