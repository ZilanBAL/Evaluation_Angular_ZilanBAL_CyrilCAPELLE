# Projet JavaScript - Jeu du Pendu

Le Pendu est un jeu de devinette où l'objectif est de trouver un mot caché en proposant des lettres, avec un nombre limité d'erreurs autorisées.

## Capacités du jeu

- Le jeu propose un mot aléatoire à deviner
- Le joueur dispose de 5 erreurs maximum
- Chaque erreur fait apparaître une partie du dessin du pendu
- Le mot est affiché avec des underscores (\_) pour les lettres non trouvées

## Fonctionnalités minimales à développer

### Initialisation du jeu

- Au chargement de la page, sélectionner un mot aléatoire dans la liste
- Afficher le mot avec des underscores pour chaque lettre
- Mettre en place l'écouteur d'événements clavier

### Boucle principale du jeu

- Le joueur tape une lettre sur son clavier physique
- Seules les lettres de A à Z sont acceptées
- Une lettre déjà jouée ne peut pas être rejouée

**Si la lettre est dans le mot :**

- Remplacer tous les underscores correspondants par la lettre trouvée
- Afficher la lettre dans la zone "Lettres jouées" avec un badge vert (succès)

**Si la lettre n'est pas dans le mot :**

- Incrémenter le compteur d'erreurs
- Afficher la partie suivante du dessin du pendu
- Afficher la lettre dans la zone "Lettres jouées" avec un badge rouge (erreur)

### Gestion de la fin de partie

**Victoire :**

- Quand toutes les lettres du mot sont trouvées
- Afficher un message de félicitations
- Proposer de rejouer

**Défaite :**

- Quand le nombre d'erreurs atteint 5
- Afficher le dessin complet du pendu
- Révéler le mot à trouver
- Afficher un message de game over
- Proposer de rejouer

### Statistiques

- Afficher le nombre d'erreurs en temps réel (format: X/5)
- Enregistrer et afficher le record de parties gagnées consécutives
- Stocker le record dans le localStorage pour une persistance des données, ou simplement dans une variable du service Angular (les données seront perdues au rechargement de la page)

### Rejouer

## Fonctionnalités complémentaires à développer

Quand le joueur clique sur "Nouvelle Partie" ou "Rejouer" :

- Réinitialiser le compteur d'erreurs
- Cacher toutes les parties du dessin du pendu
- Sélectionner un nouveau mot aléatoire
- Réactiver toutes les lettres du clavier
- Afficher le nouveau mot avec des underscores

### Récupération des mots via une API externe

Vous devez intégrer une API externe afin de récupérer des mots aléatoires.

**API à utiliser :**

```
https://random-words-api.kushcreates.com/
```

### Historique des parties

Quand le joueur clique sur "Historique des parties" :

- Redirection sur une page `/history`
- Afficher l'historique des parties jouées
  - Date de la partie
  - Mot à trouver
  - Lettres trouvées
  - Nombre d'erreurs
  - Statut (gagné/perdu)
- Stocker les parties dans le localStorage pour une persistance des données, ou simplement dans une variable du service Angular (les données seront perdues au rechargement de la page)
- Afficher le nombre de parties gagnées et perdues

## Notes

- [Voir la documentation de DaisyUI](https://daisyui.com/components/) pour les componsants Badge, Modal, etc.
