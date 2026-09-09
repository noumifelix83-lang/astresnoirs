import aissatouAbba from "../assets/covers/aissatou-abba.jpg";
import rachel1 from "../assets/covers/rachel-1.jpg";
import rachel2 from "../assets/covers/rachel-2.jpg";
import zeukap from "../assets/covers/zeukap.jpg";
import graal from "../assets/covers/recherche-du-graal.jpg";
import alouette from "../assets/covers/plumes-alouette.jpg";
import weya from "../assets/covers/weya-paix-securite.jpg";
import roger from "../assets/covers/roger-problematique-sante.jpg";

/**
 * forSale:true + priceKnown:true  -> bouton "Commander" (ajoute au panier)
 * forSale:true + priceKnown:false -> bouton "Commander" -> ouvre une demande WhatsApp (prix à confirmer)
 * forSale:false                   -> vitrine uniquement ("Disponible en librairie")
 *
 * Seuls les ouvrages avec une couverture réelle (`img`) apparaissent dans le catalogue.
 */
export const books = [
  {
    id: "fn1",
    title: "Le drame d'Aïssatou Abba",
    subtitle: "un fils, deux pères",
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: "Œuvre du fondateur",
    format: "Broché",
    img: aissatouAbba,
    forSale: true,
    priceKnown: true,
    price: 4535,
    priceEur: "6,91 €",
    isbn: "978-9956-33-668-5",
    desc: "Une vitrine par excellence de la vie dans nos familles et des traditions au sujet du mariage, au mieux de l'avenir de la jeune fille dans le contexte africain. Le dramaturge rapporte les interactions entre les parents d'une demoiselle, au cœur des choix de la vie conjugale et du parcours scolaire.",
  },
  {
    id: "fn2",
    title: "L'histoire de Rachel 1",
    subtitle: "La lune parmi les étoiles",
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: "Œuvre du fondateur",
    format: "Format Kindle",
    img: rachel1,
    forSale: true,
    priceKnown: true,
    price: 4535,
    priceEur: "6,91 €",
    isbn: "978-9956-33-670-8",
    desc: "Rachel, une fleur convoitée pour sa joliesse et sa tendresse, se voit imposer un homme avec qui elle est obligée de faire sa vie. Mais son compagnon ne réussira pas à conquérir son cœur, car son amour est porté vers quelqu'un d'autre.",
  },
  {
    id: "fn3",
    title: "L'histoire de Rachel 2",
    subtitle: "Trop longue fut l'attente",
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: "Œuvre du fondateur",
    format: "Format Kindle",
    img: rachel2,
    forSale: true,
    priceKnown: true,
    price: 3980,
    priceEur: "6,07 €",
    isbn: "978-9956-33-669-2",
    desc: "La suite du premier tome, centrée sur les conditions sentimentales d'une jeune fille partagée par les raisons du cœur. Les intrigues montrent les divergences entre le rêve et les réalités qui surgissent de façon inattendue.",
  },
  {
    id: "fn4",
    title: "Zeukap",
    subtitle: "ou la légion d'honneur",
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: "Œuvre du fondateur",
    format: "Format Kindle",
    img: zeukap,
    forSale: true,
    priceKnown: true,
    price: 6785,
    priceEur: "10,34 €",
    isbn: "978-9956-33-672-2",
    desc: "Le chef du village Ngouaba, ses notables et les adeptes des pratiques importées mènent le débat autour d'un rituel ancestral de la communauté, entre tradition et modernité. L'œuvre promet le multiculturalisme et l'interculturalité des peuples.",
  },
  {
    id: "fn5",
    title: "La recherche du Graal",
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: "Œuvre du fondateur",
    format: "Broché",
    img: graal,
    forSale: true,
    priceKnown: true,
    price: 7850,
    priceEur: "11,97 €",
    isbn: "978-9956-33-667-8",
    desc: "L'autopsie d'une société en proie au chômage des jeunes. Njogo, diplômé des universités, vit une situation précaire malgré sa quête d'un emploi pour sortir de la pauvreté — le théâtre comme canal pour explorer nos dures réalités.",
  },
  {
    id: "fn6",
    title: "Les plumes d'une alouette",
    author: "Félix Njandja",
    genre: "Roman",
    coll: "Œuvre du fondateur",
    format: "Broché",
    img: alouette,
    forSale: true,
    priceKnown: false,
    isbn: "978-9956-33-671-5",
    desc: "Les établissements scolaires dépassent le cadre de l'instruction, mission première de l'enseignement. Ce roman dévoile les relations amoureuses entre professeurs et apprenantes, le récit d'un maître du savoir face à ses mésaventures — une histoire empreinte de métaphores et d'émotions.",
  },
  {
    id: "b1",
    title: "Paix et sécurité internationales à l'ère de la mondialisation",
    subtitle: "vision transcendantale d'une théorie d'identisation humaine",
    author: "Jean Hermann Weya",
    genre: "Essai",
    coll: "Sapiens",
    img: weya,
    forSale: false,
    desc: "Un essai qui défend la thèse selon laquelle la paix et la sécurité durables reposent sur la reconnaissance de l'humanité comme unité fondamentale, au-delà des différences sociales, culturelles, politiques ou religieuses — préfacé par S.E. Dr Hamidou Komidor Njimoluh.",
  },
  {
    id: "b2",
    title: "Problématique de santé en Afrique au Sud du Sahara",
    subtitle: "entre vices et stratégies pour une solution durable du secteur médical",
    author: "Faustin Roger",
    genre: "Essai",
    coll: "Sapiens",
    img: roger,
    forSale: false,
    desc: "Une plongée dans les enjeux de santé des anciennes colonies françaises d'Afrique subsaharienne, entre désillusions post-1986 et nécessité de réinventer le système de santé à partir de priorités et de spécificités locales.",
  },
];

/** Ordre d'affichage du diaporama en fond de bannière. */
export const heroSlideIds = ["fn5"]; // La recherche du Graal
