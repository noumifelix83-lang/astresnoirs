import aissatouAbba from "../assets/covers/aissatou-abba.webp";
import rachel1 from "../assets/covers/rachel-1.webp";
import rachel2 from "../assets/covers/rachel-2.webp";
import zeukap from "../assets/covers/zeukap.webp";
import graal from "../assets/covers/recherche-du-graal.webp";
import alouette from "../assets/covers/plumes-alouette.webp";
import weya from "../assets/covers/weya-paix-securite.webp";
import roger from "../assets/covers/roger-problematique-sante.webp";

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
    subtitle: { fr: "un fils, deux pères", en: "one son, two fathers" },
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: { fr: "Œuvre du fondateur", en: "Founder's work" },
    format: { fr: "Broché", en: "Paperback" },
    img: aissatouAbba,
    forSale: true,
    priceKnown: true,
    price: 4535,
    priceEur: "6,91 €",
    isbn: "978-9956-33-668-5",
    desc: {
      fr: "Une vitrine par excellence de la vie dans nos familles et des traditions au sujet du mariage, au mieux de l'avenir de la jeune fille dans le contexte africain. Le dramaturge rapporte les interactions entre les parents d'une demoiselle, au cœur des choix de la vie conjugale et du parcours scolaire.",
      en: "A prime showcase of family life and marriage traditions, weighed against a young woman's future in the African context. The playwright depicts the interactions between a young lady's parents, at the heart of choices about married life and schooling.",
    },
  },
  {
    id: "fn2",
    title: "L'histoire de Rachel 1",
    subtitle: { fr: "La lune parmi les étoiles", en: "The moon among the stars" },
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: { fr: "Œuvre du fondateur", en: "Founder's work" },
    format: { fr: "Format Kindle", en: "Kindle Edition" },
    img: rachel1,
    forSale: true,
    priceKnown: true,
    price: 4535,
    priceEur: "6,91 €",
    isbn: "978-9956-33-670-8",
    desc: {
      fr: "Rachel, une fleur convoitée pour sa joliesse et sa tendresse, se voit imposer un homme avec qui elle est obligée de faire sa vie. Mais son compagnon ne réussira pas à conquérir son cœur, car son amour est porté vers quelqu'un d'autre.",
      en: "Rachel, a flower coveted for her beauty and gentleness, is forced into a life with a man she did not choose. But her companion will never win her heart, for her love belongs to someone else.",
    },
  },
  {
    id: "fn3",
    title: "L'histoire de Rachel 2",
    subtitle: { fr: "Trop longue fut l'attente", en: "Too long was the wait" },
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: { fr: "Œuvre du fondateur", en: "Founder's work" },
    format: { fr: "Format Kindle", en: "Kindle Edition" },
    img: rachel2,
    forSale: true,
    priceKnown: true,
    price: 3980,
    priceEur: "6,07 €",
    isbn: "978-9956-33-669-2",
    desc: {
      fr: "La suite du premier tome, centrée sur les conditions sentimentales d'une jeune fille partagée par les raisons du cœur. Les intrigues montrent les divergences entre le rêve et les réalités qui surgissent de façon inattendue.",
      en: "The sequel to the first volume, centered on the emotional torment of a young woman torn by matters of the heart. The plot reveals the gaps between dreams and the realities that arise unexpectedly.",
    },
  },
  {
    id: "fn4",
    title: "Zeukap",
    subtitle: { fr: "ou la légion d'honneur", en: "or the legion of honour" },
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: { fr: "Œuvre du fondateur", en: "Founder's work" },
    format: { fr: "Format Kindle", en: "Kindle Edition" },
    img: zeukap,
    forSale: true,
    priceKnown: true,
    price: 6785,
    priceEur: "10,34 €",
    isbn: "978-9956-33-672-2",
    desc: {
      fr: "Le chef du village Ngouaba, ses notables et les adeptes des pratiques importées mènent le débat autour d'un rituel ancestral de la communauté, entre tradition et modernité. L'œuvre promet le multiculturalisme et l'interculturalité des peuples.",
      en: "The chief of the village of Ngouaba, his notables, and the followers of imported practices debate an ancestral community ritual, caught between tradition and modernity. The work champions multiculturalism and intercultural exchange among peoples.",
    },
  },
  {
    id: "fn5",
    title: "La recherche du Graal",
    author: "Félix Njandja",
    genre: "Théâtre",
    coll: { fr: "Œuvre du fondateur", en: "Founder's work" },
    format: { fr: "Broché", en: "Paperback" },
    img: graal,
    forSale: true,
    priceKnown: true,
    price: 7850,
    priceEur: "11,97 €",
    isbn: "978-9956-33-667-8",
    desc: {
      fr: "L'autopsie d'une société en proie au chômage des jeunes. Njogo, diplômé des universités, vit une situation précaire malgré sa quête d'un emploi pour sortir de la pauvreté — le théâtre comme canal pour explorer nos dures réalités.",
      en: "An autopsy of a society gripped by youth unemployment. Njogo, a university graduate, lives in precarious conditions despite his search for work to escape poverty — theatre as a channel to explore our harsh realities.",
    },
  },
  {
    id: "fn6",
    title: "Les plumes d'une alouette",
    author: "Félix Njandja",
    genre: "Roman",
    coll: { fr: "Œuvre du fondateur", en: "Founder's work" },
    format: { fr: "Broché", en: "Paperback" },
    img: alouette,
    forSale: true,
    priceKnown: false,
    isbn: "978-9956-33-671-5",
    desc: {
      fr: "Les établissements scolaires dépassent le cadre de l'instruction, mission première de l'enseignement. Ce roman dévoile les relations amoureuses entre professeurs et apprenantes, le récit d'un maître du savoir face à ses mésaventures — une histoire empreinte de métaphores et d'émotions.",
      en: "Schools go beyond the bounds of instruction, education's first mission. This novel uncovers romantic relationships between teachers and students, the story of a man of knowledge facing his own missteps — a tale steeped in metaphor and emotion.",
    },
  },
  {
    id: "b1",
    title: "Paix et sécurité internationales à l'ère de la mondialisation",
    subtitle: {
      fr: "vision transcendantale d'une théorie d'identisation humaine",
      en: "a transcendental vision of a theory of human identisation",
    },
    author: "Jean Hermann Weya",
    genre: "Essai",
    coll: "Sapiens",
    img: weya,
    forSale: false,
    desc: {
      fr: "Un essai qui défend la thèse selon laquelle la paix et la sécurité durables reposent sur la reconnaissance de l'humanité comme unité fondamentale, au-delà des différences sociales, culturelles, politiques ou religieuses — préfacé par S.E. Dr Hamidou Komidor Njimoluh.",
      en: "An essay arguing that lasting peace and security rest on recognizing humanity as a fundamental unit, beyond social, cultural, political or religious differences — prefaced by H.E. Dr Hamidou Komidor Njimoluh.",
    },
  },
  {
    id: "b2",
    title: "Problématique de santé en Afrique au Sud du Sahara",
    subtitle: {
      fr: "entre vices et stratégies pour une solution durable du secteur médical",
      en: "between pitfalls and strategies for a lasting solution in the medical sector",
    },
    author: "Faustin Roger",
    genre: "Essai",
    coll: "Sapiens",
    img: roger,
    forSale: false,
    desc: {
      fr: "Une plongée dans les enjeux de santé des anciennes colonies françaises d'Afrique subsaharienne, entre désillusions post-1986 et nécessité de réinventer le système de santé à partir de priorités et de spécificités locales.",
      en: "A deep dive into the health challenges of former French colonies in Sub-Saharan Africa, between post-1986 disillusionment and the need to reinvent the health system based on local priorities and specifics.",
    },
  },
];
