# Éditions Astres Noirs — Site web

Site vitrine et boutique en ligne pour les Éditions Astres Noirs (Yaoundé, Cameroun).

Application React (Vite).

## Structure du dépôt

- `index.html`, `src/` — l'application React (composants, données du catalogue, styles).
  - `src/data/books.js` — catalogue et boutique : titres, prix, descriptions, couvertures.
  - `src/context/CartContext.jsx` — logique du panier (ajout/retrait, sous-total, commande WhatsApp).
  - `src/components/` — un composant par section du site.
- `docs/cahier-des-charges.html` — liste priorisée des contenus restant à fournir.
- `Cahier-des-charges-Astres-Noirs.pdf` — la même liste, en PDF téléchargeable depuis le site.
- `source/` — fichiers d'origine fournis par la maison d'édition (logo, texte de présentation).
- `site.html` — ancienne version autonome (HTML/CSS/JS, un seul fichier). Conservée pour l'aperçu Artifact
  Claude ; n'est plus synchronisée automatiquement avec le site React et peut se désynchroniser au fil des
  mises à jour de `src/`.

## Développer en local

```bash
npm install
npm run dev       # serveur de développement avec rechargement à chaud
npm run build     # build de production dans dist/
npm run preview   # sert le build de production localement
```

## Déploiement

Le dépôt est connecté à Vercel (`vercel.json` fixe la commande de build sur `npm run build` et le dossier de
sortie sur `dist`). Chaque `git push` sur `main` déclenche un déploiement automatique.

## État actuel

Le catalogue affiche tous les ouvrages avec une couverture réelle ; ceux du fondateur (Félix Njandja) portent
un bouton « Commander ». La boutique est réservée à ses six œuvres. Un titre (« Les plumes d'une alouette »)
n'a pas encore de prix confirmé — il affiche « Prix sur demande » et ouvre une demande WhatsApp au lieu
d'ajouter au panier.

La commande passe par un lien WhatsApp pré-rempli (`+237 679 635 690`) — aucun système de paiement en ligne
n'est branché.

## Mettre à jour le contenu

Modifier `src/data/books.js` (titres, prix, descriptions, collections) — les couvertures se trouvent dans
`src/assets/covers/`. Committer et pousser les changements ; Vercel republie automatiquement.
