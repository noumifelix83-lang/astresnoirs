/**
 * Actualités de la maison — première brique d'« Astres Actu », le futur
 * journal en ligne des Éditions Astres Noirs (nom de domaine prévu :
 * astresactu.com). Chaque entrée est un billet simple (titre, date, résumé,
 * corps de texte, et éventuellement une vidéo). Pour publier un nouveau
 * billet, il suffit d'ajouter un objet en tête de ce tableau.
 */
export const actualites = [
  {
    id: "capsule-six-publications-felix-njandja",
    date: "2026-09-16",
    title: {
      fr: "Six nouvelles publications de Félix Njandja",
      en: "Six new publications from Félix Njandja",
    },
    excerpt: {
      fr: "Dans cette capsule vidéo, Tchuisseu Lowe, directeur des Éditions Astres Noirs, présente les six derniers ouvrages parus de l'écrivain Félix Njandja, disponibles à Yaoundé et sur Amazon.",
      en: "In this video capsule, Tchuisseu Lowe, director of Éditions Astres Noirs, presents the six latest books published by writer Félix Njandja, available in Yaoundé and on Amazon.",
    },
    video: "/media/presentation-astres-noirs.mp4",
    poster: "/media/presentation-poster.webp",
    body: [
      {
        fr: "Dans cette capsule, Tchuisseu Lowe, journaliste, écrivain et directeur des Éditions Astres Noirs, revient sur la vocation généraliste de la maison — romans, poésie, théâtre, essais, contes et fables — avant de présenter les six ouvrages nouvellement parus de l'écrivain Félix Njandja : Les plumes d'une alouette, La recherche du Graal, Le drame d'Aïssatou Abba, Zeukap : ou la légion d'honneur, L'histoire de Rachel 1 et L'histoire de Rachel 2.",
        en: "In this capsule, Tchuisseu Lowe, journalist, writer and director of Éditions Astres Noirs, revisits the house's general-interest vocation — novels, poetry, theatre, essays, tales and fables — before presenting the six newly published works by writer Félix Njandja: Les plumes d'une alouette, La recherche du Graal, Le drame d'Aïssatou Abba, Zeukap: ou la légion d'honneur, L'histoire de Rachel 1 and L'histoire de Rachel 2.",
      },
      {
        fr: "Ces six ouvrages sont disponibles au siège des Éditions Astres Noirs à Maetur Mendong (Yaoundé), à la Librairie Le Peuple Noir, à Tinga, ainsi que sur Amazon.",
        en: "These six books are available at the headquarters of Éditions Astres Noirs in Maetur Mendong (Yaoundé), at the Librairie Le Peuple Noir in Tinga, as well as on Amazon.",
      },
      {
        fr: "La maison rappelle à tous les auteurs, connus et inconnus, qu'il est temps de se rapprocher des Éditions Astres Noirs pour donner vie à leurs projets éditoriaux.",
        en: "The house reminds all authors, known and unknown, that it's time to reach out to Éditions Astres Noirs to bring their editorial projects to life.",
      },
    ],
  },
];
