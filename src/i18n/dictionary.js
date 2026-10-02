/**
 * Dictionnaire bilingue FR/EN de toutes les chaînes d'interface du site.
 * Utilisé par `useLang().t("section.cle")`. Les textes propres aux données
 * (livres, actualités, équipe) vivent dans leurs fichiers `src/data/*.js`
 * sous forme de champs { fr, en }, lus via `useLang().pick(...)`.
 */
export const dict = {
  nav: {
    about: { fr: "La maison", en: "The House" },
    collections: { fr: "Collections", en: "Collections" },
    catalogue: { fr: "Catalogue", en: "Catalogue" },
    boutique: { fr: "Boutique", en: "Shop" },
    auteurs: { fr: "Auteurs", en: "Authors" },
    actualites: { fr: "Actualités", en: "News" },
    contact: { fr: "Contact", en: "Contact" },
    brandWord: { fr: "Astres Noirs", en: "Astres Noirs" },
    brandSub: { fr: "Éditions", en: "Éditions" },
    dashboardAria: { fr: "Tableau de bord de l'équipe", en: "Staff dashboard" },
    monEspaceAria: { fr: "Mon espace auteur", en: "My author space" },
    cartAria: { fr: "Ouvrir le panier", en: "Open cart" },
    menuAria: { fr: "Ouvrir le menu", en: "Open menu" },
    langToggleLabel: { fr: "EN", en: "FR" },
    langToggleAria: { fr: "Afficher le site en anglais", en: "Switch the site to French" },
  },

  hero: {
    eyebrow: {
      fr: "Édition, impression & gestion du livre — Yaoundé, Cameroun",
      en: "Publishing, printing & book management — Yaoundé, Cameroon",
    },
    titleLine1: { fr: "Chaque livre a", en: "Every book has" },
    titleLine2: { fr: "son astre.", en: "its own star." },
    sloganLabel: { fr: "Notre devise", en: "Our motto" },
    sloganWord: { fr: "Qui Lira", en: "Who Reads" },
    sloganEm: { fr: "Vivra", en: "Shall Live" },
    lede: {
      fr: "Les Éditions Astres Noirs accompagnent romanciers, poètes, essayistes, dramaturges, conteurs et fabulistes, de l'écriture à l'impression jusqu'aux mains du lecteur — une maison pensée pour rayonner du Cameroun à l'Afrique, et au-delà.",
      en: "Éditions Astres Noirs supports novelists, poets, essayists, playwrights, storytellers and fable-writers, from the written word to print and into readers' hands — a publishing house built to shine from Cameroon to Africa, and beyond.",
    },
    ctaCatalogue: { fr: "Découvrir le catalogue", en: "Discover the catalogue" },
    ctaPublish: { fr: "Publier un manuscrit", en: "Submit a manuscript" },
    scrollCue: { fr: "Faire défiler", en: "Scroll" },
  },

  sloganBand: {
    word: { fr: "Qui Lira", en: "Who Reads" },
    em: { fr: "Vivra", en: "Shall Live" },
  },

  about: {
    eyebrow: { fr: "La maison", en: "The House" },
    title: {
      fr: "Une maison généraliste, née à Yaoundé, ambitionnée pour l'Afrique et le monde.",
      en: "A general-interest publishing house, born in Yaoundé, with ambitions for Africa and the world.",
    },
    p1: {
      fr: "Face à un marché de l'édition national et international exigeant, nous avons choisi d'ouvrir nos portes à tous les genres littéraires. Chaque manuscrit reçoit un travail éditorial méticuleux, mené par une équipe de passionnés du livre, pour que le projet de l'auteur devienne une réussite éditoriale.",
      en: "Facing a demanding national and international publishing market, we chose to open our doors to every literary genre. Each manuscript receives meticulous editorial work, led by a team of book lovers, so the author's project becomes a publishing success.",
    },
    p2: {
      fr: "Au-delà de l'édition, notre maison couvre l'ensemble de la chaîne du livre — de l'impression à la diffusion — avec l'ambition de devenir un modèle de référence dans l'univers de la littérature camerounaise et africaine.",
      en: "Beyond publishing, our house covers the entire book chain — from printing to distribution — with the ambition of becoming a reference model in Cameroonian and African literature.",
    },
    p3: {
      fr: "Notre stratégie de communication et nos plateformes digitales font vivre le lien entre éditeur, auteurs et lecteurs, aux quatre coins du monde — dans les librairies, les bibliothèques, les écoles, comme sur les réseaux.",
      en: "Our communication strategy and digital platforms keep the link between publisher, authors and readers alive across the globe — in bookshops, libraries, schools, and on social media.",
    },
    pull: {
      fr: "« Aux Éditions Astres Noirs, chaque livre a son histoire et son caractère unique. »",
      en: "“At Éditions Astres Noirs, every book has its own story and its own unique character.”",
    },
    catalogueEyebrow: { fr: "Déjà dans notre catalogue", en: "Already in our catalogue" },
    genreComingSoon: { fr: "à venir", en: "coming soon" },
    genres: {
      Roman: { fr: "Romans", en: "Novels" },
      Poésie: { fr: "Poésie", en: "Poetry" },
      Essai: { fr: "Essais", en: "Essays" },
      Théâtre: { fr: "Théâtre", en: "Plays" },
      Contes: { fr: "Contes", en: "Tales" },
      Fables: { fr: "Fables", en: "Fables" },
    },
    stat1: { fr: "Collections actives, du savoir à la jeunesse", en: "Active collections, from scholarship to children's books" },
    stat2: { fr: "Membres de l'équipe éditoriale & commerciale", en: "Members of the editorial & commercial team" },
    stat3: { fr: "Relecteurs dédiés à la qualité du texte", en: "Proofreaders dedicated to text quality" },
    stat4: { fr: "Réseaux de diffusion, local et international", en: "Distribution networks, local and international" },
  },

  collections: {
    eyebrow: { fr: "Quatre collections", en: "Four collections" },
    title: { fr: "Un rayon pour chaque lecture.", en: "A shelf for every kind of reading." },
    lede: {
      fr: "Du savoir à l'imaginaire, chaque collection porte une voix et un lectorat.",
      en: "From scholarship to the imaginary, each collection carries its own voice and readership.",
    },
    sapiens: {
      role: { fr: "Essais & réflexion", en: "Essays & reflection" },
      desc: {
        fr: "Sciences humaines, pensée africaine contemporaine et essais qui éclairent le monde d'aujourd'hui.",
        en: "Humanities, contemporary African thought, and essays that illuminate today's world.",
      },
    },
    calebasse: {
      role: { fr: "Contes & oralité", en: "Tales & oral tradition" },
      desc: {
        fr: "Contes, fables et traditions orales — la sagesse ancestrale transmise et mise en page.",
        en: "Tales, fables and oral traditions — ancestral wisdom passed down and set in print.",
      },
    },
    reveAfrique: {
      role: { fr: "Romans & poésie", en: "Novels & poetry" },
      desc: {
        fr: "Les grands récits du continent : fiction, poésie et voix romanesques qui traversent les frontières.",
        en: "The continent's great narratives: fiction, poetry and novelistic voices that cross borders.",
      },
    },
    jeunesse: {
      role: { fr: "Littérature pour enfants", en: "Children's literature" },
      desc: {
        fr: "Des histoires illustrées pensées pour donner aux plus jeunes le goût de lire tôt.",
        en: "Illustrated stories designed to give the youngest readers a love of reading early on.",
      },
    },
  },

  catalogue: {
    eyebrow: { fr: "Catalogue", en: "Catalogue" },
    title: { fr: "Une sélection de nos ouvrages.", en: "A selection of our books." },
    lede: {
      fr: "Notre catalogue se parcourt librement ici. Les titres déjà disponibles à l'achat portent la mention « Commander ».",
      en: "Browse our catalogue freely here. Titles already available for purchase carry the “Order” label.",
    },
    vitrineTag: { fr: "Disponible en librairie", en: "Available in bookshops" },
    order: { fr: "Commander", en: "Order" },
  },

  boutique: {
    eyebrow: { fr: "Boutique", en: "Shop" },
    title: { fr: "Six œuvres, un seul auteur en vente directe.", en: "Six works, one author available for direct sale." },
    lede: {
      fr: "La boutique est aujourd'hui réservée à l'auteur qui a fondé la maison. Le reste de notre catalogue rejoindra la vente en ligne au fil de sa mise en distribution numérique.",
      en: "The shop is currently reserved for the author who founded the house. The rest of our catalogue will join online sales as it becomes available in digital distribution.",
    },
    founderRole: { fr: "Auteur — Président Directeur Général", en: "Author — Chairman & CEO" },
    founderSignature: { fr: "Fondateur des Éditions Astres Noirs", en: "Founder of Éditions Astres Noirs" },
    founderBio: {
      fr: "Né à Bangoua–Bangangté, dans le département du Ndé (région de l'Ouest), Félix Njandja est enseignant de Lettres bilingues. Dramaturge, poète, romancier et opérateur économique, il est promoteur de plusieurs entreprises dans divers secteurs, notamment l'éducation, l'art et la culture. Féru des traditions africaines et grand voyageur, il est aujourd'hui fondateur et Président Directeur Général des Éditions Astres Noirs — et l'auteur des six œuvres ci-dessous.",
      en: "Born in Bangoua–Bangangté, in the Ndé department (West Region), Félix Njandja is a bilingual-letters teacher. Playwright, poet, novelist and businessman, he has founded several companies across sectors including education, art and culture. A lover of African traditions and a seasoned traveler, he is today the founder and Chairman & CEO of Éditions Astres Noirs — and the author of the six works below.",
    },
    founderQuote: { fr: "« Qui Lira Vivra. »", en: "“Who Reads Shall Live.”" },
    priceTbd: { fr: "Prix sur demande", en: "Price on request" },
    consult: { fr: "Nous consulter", en: "Contact us" },
    order: { fr: "Commander", en: "Order" },
    trust1Title: { fr: "Livraison internationale", en: "International delivery" },
    trust1Text: {
      fr: "Depuis Yaoundé vers les États-Unis, l'Europe et au-delà — mode d'envoi et délai confirmés avec vous après la commande.",
      en: "From Yaoundé to the United States, Europe and beyond — shipping method and timeline confirmed with you after ordering.",
    },
    trust2Title: { fr: "Commande directe, sans détour", en: "Direct ordering, no middleman" },
    trust2Text: {
      fr: "Chaque commande est confirmée personnellement via WhatsApp avec l'éditeur — pas de compte à créer, pas de formulaire.",
      en: "Every order is personally confirmed via WhatsApp with the publisher — no account to create, no form to fill in.",
    },
    trust3Title: { fr: "Papier & numérique", en: "Print & digital" },
    trust3Text: {
      fr: "Plusieurs titres existent aussi en édition Kindle, disponible instantanément où que vous soyez.",
      en: "Several titles are also available as Kindle editions, instantly available wherever you are.",
    },
    trust4Title: { fr: "Paiement adapté à votre pays", en: "Payment suited to your country" },
    trust4Text: {
      fr: "Les modalités de règlement (Mobile Money, virement, ou autre selon votre pays) vous sont proposées au moment de la confirmation.",
      en: "Payment options (Mobile Money, bank transfer, or other depending on your country) are offered to you at confirmation time.",
    },
  },

  auteurs: {
    eyebrow: { fr: "Vous êtes auteur ?", en: "Are you an author?" },
    title: {
      fr: "Publier chez Astres Noirs, c'est entrer dans la cour des grands.",
      en: "Publishing with Astres Noirs means joining the big league.",
    },
    step1Title: { fr: "Connexion", en: "Sign in" },
    step1Text: {
      fr: "Connectez-vous avec votre compte Google — cela nous permet de vous identifier et de suivre votre dossier.",
      en: "Sign in with your Google account — this lets us identify you and track your submission.",
    },
    step2Title: { fr: "Envoi du manuscrit", en: "Send your manuscript" },
    step2Text: {
      fr: "Roman, poésie, essai, théâtre, conte ou fable — envoyez votre texte complet via le formulaire.",
      en: "Novel, poetry, essay, theatre, tale or fable — send your complete text through the form.",
    },
    step3Title: { fr: "Comité de lecture", en: "Reading committee" },
    step3Text: {
      fr: "Cinq relecteurs et le comité éditorial étudient votre texte avec soin.",
      en: "Five proofreaders and the editorial committee review your text with care.",
    },
    step4Title: { fr: "Accompagnement éditorial", en: "Editorial support" },
    step4Text: {
      fr: "Relecture, mise en page, direction artistique et diffusion, main dans la main avec vous.",
      en: "Proofreading, layout, art direction and distribution, hand in hand with you.",
    },
    submitEyebrow: { fr: "Soumettre un manuscrit", en: "Submit a manuscript" },
    submitTitle: { fr: "Prêt à nous confier votre texte ?", en: "Ready to entrust us with your text?" },
    notConfigured: {
      fr: "La connexion auteur est en cours de mise en place. Revenez très bientôt, ou écrivez-nous directement à",
      en: "The author sign-in is currently being set up. Please check back soon, or write to us directly at",
    },
    loading: { fr: "Chargement…", en: "Loading…" },
    loginPrompt: {
      fr: "Connectez-vous avec votre compte Google pour soumettre votre manuscrit. Cela nous permet de vous identifier et de suivre votre dossier au fil de l'évaluation éditoriale.",
      en: "Sign in with your Google account to submit your manuscript. This lets us identify you and track your submission throughout the editorial review.",
    },
    googleSignIn: { fr: "Se connecter avec Google", en: "Sign in with Google" },
    connectedAs: { fr: "Connecté en tant que", en: "Signed in as" },
    signOut: { fr: "se déconnecter", en: "sign out" },
    trackLink: { fr: "Suivre l'avancement de mes manuscrits →", en: "Track the progress of my manuscripts →" },
    fieldTitle: { fr: "Titre de l'ouvrage", en: "Book title" },
    fieldGenre: { fr: "Genre", en: "Genre" },
    fieldGenreChoose: { fr: "Choisir…", en: "Choose…" },
    genreRoman: { fr: "Roman", en: "Novel" },
    genrePoesie: { fr: "Poésie", en: "Poetry" },
    genreEssai: { fr: "Essai", en: "Essay" },
    genreTheatre: { fr: "Théâtre", en: "Play" },
    genreContes: { fr: "Contes", en: "Tales" },
    genreFables: { fr: "Fables", en: "Fables" },
    genreAutre: { fr: "Autre", en: "Other" },
    fieldSummary: { fr: "Résumé & présentation de l'auteur", en: "Summary & author bio" },
    fieldSummaryPlaceholder: {
      fr: "Résumé de l'œuvre, et quelques lignes sur vous…",
      en: "Summary of the work, and a few lines about yourself…",
    },
    fieldFile: { fr: "Manuscrit", en: "Manuscript" },
    fieldFileHint: { fr: "Mo max — PDF ou Word", en: "MB max — PDF or Word" },
    fileTooLarge: {
      fr: "Ce fichier dépasse {max} Mo. Merci de le compresser avant l'envoi.",
      en: "This file exceeds {max} MB. Please compress it before sending.",
    },
    sending: { fr: "Envoi en cours…", en: "Sending…" },
    submit: { fr: "Envoyer le manuscrit", en: "Send manuscript" },
    successMsg: {
      fr: "Merci ! Votre manuscrit a bien été transmis à notre comité éditorial, qui reviendra vers vous rapidement.",
      en: "Thank you! Your manuscript has been sent to our editorial committee, who will get back to you shortly.",
    },
    errorMsg: {
      fr: "Une erreur est survenue lors de l'envoi. Réessayez, ou écrivez-nous directement à",
      en: "An error occurred while sending. Please try again, or write to us directly at",
    },
    teamEyebrow: { fr: "L'équipe", en: "The team" },
    teamTitle: { fr: "Les visages qui liront votre manuscrit.", en: "The faces who will read your manuscript." },
  },

  contact: {
    eyebrow: { fr: "Contact", en: "Contact" },
    title: { fr: "Parlons de votre projet.", en: "Let's talk about your project." },
    lede: {
      fr: "Auteurs, libraires, partenaires ou lecteurs curieux — nous vous répondons volontiers.",
      en: "Authors, booksellers, partners or curious readers — we're happy to hear from you.",
    },
    addressLabel: { fr: "Adresse", en: "Address" },
    address: { fr: "BP : 89 Mfou, Yaoundé, Cameroun", en: "P.O. Box: 89 Mfou, Yaoundé, Cameroon" },
    phoneLabel: { fr: "Téléphone", en: "Phone" },
    emailLabel: { fr: "Courriel", en: "Email" },
    fieldName: { fr: "Nom", en: "Name" },
    fieldEmail: { fr: "Courriel", en: "Email" },
    fieldSubject: { fr: "Objet", en: "Subject" },
    fieldSubjectPlaceholder: { fr: "Manuscrit, partenariat, commande…", en: "Manuscript, partnership, order…" },
    fieldMessage: { fr: "Message", en: "Message" },
    submit: { fr: "Envoyer le message", en: "Send message" },
    note: {
      fr: "L'envoi ouvre votre messagerie, préremplie à destination de aastresnoirs@gmail.com.",
      en: "Sending opens your mail app, pre-filled to aastresnoirs@gmail.com.",
    },
    defaultSubject: { fr: "Message depuis le site", en: "Message from the website" },
  },

  footer: {
    tagline: {
      fr: "Édition, impression & gestion du livre — de Yaoundé à l'Afrique. Qui Lira Vivra.",
      en: "Publishing, printing & book management — from Yaoundé to Africa. Who Reads Shall Live.",
    },
    exploreHeading: { fr: "Explorer", en: "Explore" },
    collectionsHeading: { fr: "Collections", en: "Collections" },
    contactHeading: { fr: "Contact", en: "Contact" },
    rights: { fr: "Tous droits réservés.", en: "All rights reserved." },
    privacy: { fr: "Confidentialité", en: "Privacy" },
    terms: { fr: "Conditions d'utilisation", en: "Terms of use" },
    location: { fr: "BP : 89 Mfou, Yaoundé, Cameroun", en: "P.O. Box: 89 Mfou, Yaoundé, Cameroon" },
  },

  cart: {
    title: { fr: "Votre panier", en: "Your cart" },
    closeAria: { fr: "Fermer le panier", en: "Close cart" },
    panelAria: { fr: "Panier", en: "Cart" },
    empty: {
      fr: "Votre panier est vide pour le moment. Rendez-vous dans la boutique pour ajouter un ouvrage à votre commande.",
      en: "Your cart is empty for now. Head to the shop to add a book to your order.",
    },
    decreaseAria: { fr: "Diminuer la quantité", en: "Decrease quantity" },
    increaseAria: { fr: "Augmenter la quantité", en: "Increase quantity" },
    remove: { fr: "Retirer", en: "Remove" },
    subtotal: { fr: "Sous-total", en: "Subtotal" },
    checkout: { fr: "Commander via WhatsApp", en: "Order via WhatsApp" },
    clear: { fr: "Vider le panier", en: "Clear cart" },
  },

  actualites: {
    readMore: { fr: "Lire la suite →", en: "Read more →" },
    pageEyebrow: { fr: "Actualités", en: "News" },
    pageTitle: {
      fr: "Astres Actu, le futur journal en ligne de la maison.",
      en: "Astres Actu, the house's upcoming online journal.",
    },
    pageLede: {
      fr: "En attendant son lancement, retrouvez ici les annonces, publications et coulisses des Éditions Astres Noirs — les premières pages d'Astres Actu.",
      en: "While we prepare its launch, find here the announcements, publications and behind-the-scenes of Éditions Astres Noirs — the first pages of Astres Actu.",
    },
    notFound: { fr: "Cet article n'existe pas ou plus.", en: "This article no longer exists." },
    backLink: { fr: "← Retour aux actualités", en: "← Back to news" },
  },

  monEspace: {
    eyebrow: { fr: "Espace auteur", en: "Author space" },
    title: { fr: "Mes manuscrits", en: "My manuscripts" },
    comingSoon: { fr: "L'espace auteur sera bientôt disponible.", en: "The author space will be available soon." },
    loading: { fr: "Chargement…", en: "Loading…" },
    loginPrompt: {
      fr: "Connectez-vous avec votre compte Google pour suivre l'avancement de vos manuscrits.",
      en: "Sign in with your Google account to track the progress of your manuscripts.",
    },
    googleSignIn: { fr: "Se connecter avec Google", en: "Sign in with Google" },
    connectedAs: { fr: "Connecté en tant que", en: "Signed in as" },
    signOut: { fr: "se déconnecter", en: "sign out" },
    dashboardLink: { fr: "Tableau de bord de l'équipe", en: "Staff dashboard" },
    loadError: { fr: "Impossible de charger vos manuscrits pour le moment.", en: "Unable to load your manuscripts right now." },
    fileOpenError: { fr: "Impossible d'ouvrir le fichier pour le moment. Réessayez dans un instant.", en: "Unable to open the file right now. Please try again shortly." },
    loadingList: { fr: "Chargement de vos manuscrits…", en: "Loading your manuscripts…" },
    emptyText: { fr: "Vous n'avez pas encore soumis de manuscrit.", en: "You haven't submitted a manuscript yet." },
    submitLink: { fr: "Soumettre un manuscrit", en: "Submit a manuscript" },
    sentOn: { fr: "envoyé le", en: "sent on" },
    openFile: { fr: "Ouvrir mon fichier", en: "Open my file" },
  },

  tableauDeBord: {
    eyebrow: { fr: "Équipe éditoriale", en: "Editorial team" },
    title: { fr: "Tableau de bord", en: "Dashboard" },
    notConfigured: { fr: "Base de données non configurée.", en: "Database not configured." },
    loading: { fr: "Chargement…", en: "Loading…" },
    reservedPrompt: {
      fr: "Espace réservé à l'équipe éditoriale. Connectez-vous avec votre compte Google.",
      en: "Space reserved for the editorial team. Sign in with your Google account.",
    },
    googleSignIn: { fr: "Se connecter avec Google", en: "Sign in with Google" },
    noAccess: {
      fr: "Ce compte ({email}) n'a pas accès au tableau de bord. Si vous faites partie de l'équipe, demandez qu'on ajoute votre adresse.",
      en: "This account ({email}) doesn't have access to the dashboard. If you're part of the team, ask to have your address added.",
    },
    filtersAria: { fr: "Filtrer par statut", en: "Filter by status" },
    filterAll: { fr: "Tous", en: "All" },
    loadError: { fr: "Impossible de charger les manuscrits.", en: "Unable to load manuscripts." },
    statusUpdateError: { fr: "Le changement de statut n'a pas pu être enregistré.", en: "The status change could not be saved." },
    fileOpenError: { fr: "Impossible d'ouvrir le fichier pour le moment.", en: "Unable to open the file right now." },
    loadingList: { fr: "Chargement des manuscrits…", en: "Loading manuscripts…" },
    emptyCategory: { fr: "Aucun manuscrit dans cette catégorie.", en: "No manuscripts in this category." },
    summaryDetails: { fr: "Résumé et présentation de l'auteur", en: "Summary and author bio" },
    openFile: { fr: "Ouvrir le fichier", en: "Open file" },
    statusLabel: { fr: "Statut", en: "Status" },
    backLink: { fr: "← Mon espace auteur", en: "← My author space" },
  },

  statuses: {
    nouveau: {
      label: { fr: "Reçu", en: "Received" },
      authorText: {
        fr: "Votre manuscrit nous est bien parvenu. Il va être transmis au comité de lecture.",
        en: "Your manuscript has reached us. It will be forwarded to the reading committee.",
      },
    },
    "en lecture": {
      label: { fr: "En lecture", en: "Under review" },
      authorText: {
        fr: "Le comité de lecture étudie actuellement votre texte.",
        en: "The reading committee is currently reviewing your text.",
      },
    },
    "accepté": {
      label: { fr: "Accepté", en: "Accepted" },
      authorText: {
        fr: "Félicitations ! Notre équipe va vous contacter pour la suite.",
        en: "Congratulations! Our team will contact you about next steps.",
      },
    },
    "refusé": {
      label: { fr: "Non retenu", en: "Not selected" },
      authorText: {
        fr: "Le comité n'a pas retenu votre manuscrit pour le moment. Merci de votre confiance.",
        en: "The committee has not selected your manuscript at this time. Thank you for your trust.",
      },
    },
  },
};
