/**
 * Le FCFA (XAF) est la devise de référence pour la boutique (panier, commande WhatsApp).
 * Le taux ci-dessous sert uniquement à afficher un repère approximatif en dollars US pour
 * les visiteurs américains — ce n'est pas un taux de change en temps réel. À ajuster
 * périodiquement si le cours EUR/USD bouge significativement.
 * FCFA est indexé sur l'euro à taux fixe (1 € = 655,957 FCFA) ; 1 € ≈ 1,08 $ (repère 2026).
 */
const XAF_PER_USD = 608;

export function usdApprox(fcfa) {
  const usd = fcfa / XAF_PER_USD;
  return "$" + usd.toFixed(2);
}
