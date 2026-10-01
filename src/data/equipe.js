import marcelNgono from "../assets/team/marcel-ngono.webp";
import jeanJacquesFoko from "../assets/team/jean-jacques-foko.webp";
import tchuisseuLowe from "../assets/team/tchuisseu-lowe.webp";
import felixNjandjaII from "../assets/team/felix-njandja-ii.webp";

/**
 * Équipe des Éditions Astres Noirs. La section "La maison" mentionne 11
 * membres au total — cette liste s'agrandira au fil des photos et postes
 * reçus. Pour ajouter un membre, ajouter un objet à ce tableau.
 */
export const equipe = [
  {
    id: "tchuisseu-lowe",
    name: "Tchuisseu Lowé",
    roles: [{ fr: "Directeur Général", en: "Managing Director" }],
    photo: tchuisseuLowe,
  },
  {
    id: "jean-jacques-foko",
    name: "Jean Jacques Foko",
    roles: [
      { fr: "Journaliste — critique littéraire", en: "Journalist — literary critic" },
      { fr: "Responsable de la Communication et des relations publiques", en: "Head of Communications & Public Relations" },
    ],
    photo: jeanJacquesFoko,
  },
  {
    id: "marcel-ngono",
    name: "Marcelle Ngono",
    roles: [{ fr: "Secrétaire", en: "Secretary" }],
    photo: marcelNgono,
  },
  {
    id: "felix-njandja-ii",
    name: "Noumi Félix II Njandja",
    roles: [{ fr: "Webmaster — Responsable Maintenance Informatique", en: "Webmaster — IT Maintenance Manager" }],
    photo: felixNjandjaII,
  },
];
