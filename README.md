# Projet : Gestionnaire de tâches

Application web pour gérer une liste de tâches, réalisée en **HTML**, **CSS** et **JavaScript** pur (sans framework ni classes). Les tâches sont enregistrées dans le `localStorage` du navigateur et rechargées automatiquement à l'ouverture.

> **TP en binôme – DEV IA Creil**

---

## Lancement du projet

Aucune installation ni dépendance n'est requise :

1. Cloner ou télécharger le dépôt sur votre machine.
2. Ouvrir le fichier `index.html` directement dans un navigateur web moderne (ou via l'extension _Live Server_ sur VS Code).

---

## Structure du projet

```text
gestionnaire-taches/
├── index.html    # Structure sémantique de la page, formulaire et zone de filtres
├── style.css     # Mise en forme, variables CSS, grille responsive et animations
├── script.js     # Tableau d'objets, CRUD, filtres, recherche et localStorage
└── README.md     # Documentation du projet
```

---

## Fonctionnalités

- **Ajout de tâche :** titre obligatoire, description facultative et choix du statut.
- **Affichage dynamique :** génération des cartes en JavaScript avec code couleur et badge selon le statut.
- **Modification :** édition du titre, de la description et du statut directement via le formulaire.
- **Suppression :** retrait d'une tâche avec demande de confirmation.
- **Filtrage par statut :** `Toutes`, `À faire`, `En cours`, `Terminées`, `Bloquées`.
- **Recherche en direct :** filtrage sur le titre et la description (insensible aux majuscules et aux accents).
- **Persistance des données :** sauvegarde automatique dans `localStorage` et rechargement au démarrage.
- **Statistiques (bonus) :** compteur dynamique du nombre de tâches affiché sur chaque bouton de filtre.
- **Animation (bonus) :** effet d'apparition fluide lors de la création d'une nouvelle carte.

---

## Tests effectués

- [x] Ajout d'une tâche, avec et sans description.
- [x] Validation d'un titre vide ou composé uniquement d'espaces : affichage d'un message d'erreur et blocage de l'enregistrement.
- [x] Modification du titre, de la description et du statut d'une tâche existante.
- [x] Suppression d'une tâche avec confirmation.
- [x] Mise à jour des filtres par statut et des compteurs associés.
- [x] Recherche par mot-clé dans le titre et dans la description.
- [x] Persistance des données après rechargement de la page (`localStorage`).
- [x] Affichage des messages adaptés lorsque la liste est vide ou qu'aucun résultat ne correspond.
- [x] Gestion de la corruption du `localStorage` : réinitialisation propre de la liste sans plantage.

---

## Répartition du travail

### Apprenant A : Farah Abidelli – HTML, CSS et intégration de l'interface

- **Structure HTML (`index.html`)**
  - Page structurée avec un en-tête (`<header>`) et une zone principale (`<main>`) divisée en deux parties : le formulaire et la liste des tâches.
  - Formulaire d'ajout et de modification avec un `<label>` associé à chaque champ : titre (obligatoire), description (facultative) et statut (liste déroulante).
  - Zone dédiée au message d'erreur (`role="alert"`) en cas de saisie invalide.
  - Champ de recherche et boutons de filtre par statut intégrant chacun un compteur.
  - Conteneur vide (`#liste-taches`) destiné à recevoir les cartes générées par JavaScript.
  - Emplacement dédié au message affiché lorsque la liste est vide.

- **Mise en forme (`style.css`)**
  - Utilisation de variables CSS (`:root`) pour assurer la cohérence des couleurs et des rayons.
  - Mise en page en deux colonnes avec CSS Grid (formulaire fixe à gauche, liste à droite).
  - Cartes stylisées avec une bordure et un badge colorés selon le statut (`bleu`, `orange`, `vert`, `rouge`).
  - Mise en forme des boutons, des filtres (mise en évidence du filtre actif) et des champs du formulaire avec focus clavier accessible.
  - Mise en valeur des erreurs en rouge et des champs invalides (`aria-invalid="true"`).
  - Animation d'apparition (`@keyframes`) lors de l'ajout d'une nouvelle carte.
  - Design responsive adapté aux petits écrans (passage sur une seule colonne sur mobile).

- **Intégration de l'interface**
  - Vérification de la compatibilité entre le HTML, le CSS et le JavaScript, et ajustements visuels.

---

### Apprenant B : Mihai – JavaScript

- **Modélisation des données (`script.js`)**
  - Tableau d'objets où chaque tâche possède un `id` (`Date.now()`), un `titre`, une `description`, un `statut`, une date de création (`createdAt`) et une `couleur` associée.
  - Gestion des quatre statuts autorisés : `à faire` (bleu), `en cours` (orange), `terminée` (vert), `bloquée` (rouge).

- **Fonctions et CRUD**
  - Ajout, modification et suppression d'une tâche (avec confirmation avant suppression).
  - Validation stricte des entrées : refus des titres vides, composés d'espaces ou des statuts non autorisés avec affichage d'un message explicite.
  - Génération intégrale des cartes via `document.createElement` (aucune carte écrite en dur dans le HTML).
  - Gestion dynamique des messages de liste vide ou de recherche infructueuse.

- **Événements**
  - Soumission du formulaire (en mode ajout ou édition) et clics sur les boutons _Modifier_, _Supprimer_ et _Annuler_.
  - Filtrage par statut au clic et recherche instantanée lors de la saisie (`input`).

- **Sauvegarde (`localStorage`)**
  - Enregistrement automatique du tableau à chaque opération et chargement à l'ouverture de la page.
  - Vérification de l'intégrité des données lues dans le `localStorage` (`try / catch`) avant utilisation.

---

### Travail réalisé ensemble

- Mise au point des filtres combinés et de la recherche (gestion de la casse et des accents).
- Réalisation des tests fonctionnels, corrections de bugs et validation finale.
- Collaboration sur GitHub : création d'une branche dédiée par apprenant, ouverture et relecture mutuelle des Pull Requests, puis fusion dans `main`.
