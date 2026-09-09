# Éditions Astres Noirs — Site web

Site vitrine et boutique en ligne pour les Éditions Astres Noirs (Yaoundé, Cameroun).

## Structure du dépôt

- `index.html` — le site complet (une seule page autonome : HTML, CSS et JS inclus, aucune dépendance externe hors Google Fonts).
- `docs/cahier-des-charges.html` — liste priorisée des contenus (textes, photos, livres, produits) restant à fournir pour finaliser le site.
- `source/` — fichiers d'origine fournis par la maison d'édition (logo, texte de présentation).

## État actuel

Le catalogue de livres et les articles de la boutique affichés sont des **exemples de démonstration** (titres, auteurs et prix fictifs), en attendant les données réelles listées dans le cahier des charges.

La commande passe actuellement par un lien WhatsApp pré-rempli (`+237 679 635 690`) — aucun système de paiement en ligne n'est encore branché.

## Publier le site (GitHub Pages)

1. Aller dans **Settings → Pages** du dépôt.
2. Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Le site sera disponible à une adresse du type `https://noumifelix83-lang.github.io/astresnoirs/`.

## Mettre à jour le contenu

Modifier `index.html` (catalogue de livres autour de `books = [...]` et boutique autour de `products = [...]` dans le `<script>` en bas du fichier), puis commiter et pousser les changements.
