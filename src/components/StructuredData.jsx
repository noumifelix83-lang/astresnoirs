import React from "react";
import { books } from "../data/books.js";

const SITE_URL = "https://www.astresnoirs.com/";

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
    logo: SITE_URL + "icon-512.png",
    slogan: "Qui Lira Vivra",
    email: "aastresnoirs@gmail.com",
    telephone: "+237679635690",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    description:
      "Maison d'édition généraliste basée à Yaoundé, Cameroun. Catalogue de livres (romans, poésie, essais, théâtre, contes, fables) et boutique en ligne.",
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
      const entry = {
        "@type": "Book",
        position: i + 1,
        name: b.title + (b.subtitle ? " : " + b.subtitle : ""),
        author: { "@type": "Person", name: b.author },
        genre: b.genre,
        isbn: b.isbn || undefined,
        bookFormat: b.format === "Format Kindle" ? "https://schema.org/EBook" : "https://schema.org/Paperback",
        publisher: { "@id": SITE_URL + "#organization" },
        image: SITE_URL,
        description: b.desc,
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

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(itemList)}</script>
    </>
  );
}
