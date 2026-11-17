Projet : Gestionnaire de tâches

Application web pour gérer une liste de tâches, réalisée en HTML, CSS et JavaScript (sans framework). Les tâches sont enregistrées dans le localStorage du navigateur et rechargées automatiquement à l'ouverture.

TP en binôme – DEVIA Creil.

Fonctionnalités
Ajouter une tâche (titre obligatoire, description facultative, statut)
Afficher les tâches sous forme de cartes générées dynamiquement en JavaScript
Modifier le titre, la description et le statut d'une tâche
Supprimer une tâche (avec confirmation)
Filtrer par statut : toutes, à faire, en cours, terminées, bloquées
Rechercher un texte dans le titre ou la description (insensible aux majuscules et aux accents)
Sauvegarder automatiquement dans localStorage
Statistiques : nombre de tâches par statut affiché sur chaque filtre (bonus)
Animation d'apparition d'une nouvelle carte (bonus)
Structure


gestionnaire-taches/
├── index.html    # structure de la page et formulaire
├── style.css     # mise en forme
├── script.js     # tableau de tâches, CRUD, filtres, recherche, localStorage
└── README.md


Tests effectués :

Ajout d'une tâche, avec et sans description
Titre vide et titre composé d'espaces : message d'erreur, rien n'est enregistré
Modification du titre, de la description et du statut
Suppression d'une tâche
Filtres par statut et compteurs
Recherche dans le titre et dans la description
Rechargement de la page : les tâches sont conservées
Messages affichés quand la liste est vide ou qu'aucun résultat ne correspond

Répartition du travail:
Apprenant A : Farah Abidelli – HTML, CSS et intégration de l'interface

Structure HTML (index.html)

Page structurée avec un en-tête (header) et une zone principale (main) en deux parties : le formulaire et la liste des tâches
Formulaire d'ajout et de modification avec un label associé à chaque champ : titre (obligatoire), description (facultative) et statut (liste déroulante)
Zone réservée au message d'erreur en cas de saisie invalide
Champ de recherche et boutons de filtre par statut, avec un compteur sur chacun
Conteneur vide où le JavaScript génère les cartes (les cartes ne sont pas écrites dans le HTML)
Emplacement du message affiché quand la liste est vide

Mise en forme (style.css)

Variables CSS pour les couleurs, afin de garder un style cohérent
Mise en page en deux colonnes avec CSS Grid : formulaire à gauche, liste à droite
Cartes avec une couleur et un badge selon le statut (bleu, orange, vert, rouge)
Mise en forme des boutons, des filtres (filtre actif mis en évidence) et des champs du formulaire, avec un contour visible au clavier
Message d'erreur en rouge et champ invalide mis en évidence
Animation d'apparition d'une nouvelle carte
Affichage adapté aux petits écrans (une seule colonne sur mobile)

Intégration de l'interface

Vérification que le HTML et le CSS fonctionnent avec le JavaScript, et ajustements si besoin


Apprenant B : Mihai – JavaScript
Données (script.js)

Tableau d'objets : chaque tâche a un id (Date.now()), un titre, une description, un statut, une date de création (createdAt) et une couleur associée au statut
Statuts autorisés : à faire (bleu), en cours (orange), terminée (vert), bloquée (rouge)

Fonctions et CRUD

Ajout, modification et suppression d'une tâche (avec confirmation avant suppression)
Validation : un titre vide ou composé d'espaces et un statut non autorisé sont refusés, avec un message d'erreur
Génération des cartes avec createElement : les cartes ne sont pas écrites dans le HTML
Message adapté quand la liste est vide ou quand aucun résultat ne correspond

Événements

Envoi du formulaire (ajout ou modification), clics sur les boutons Modifier, Supprimer et Annuler
Clic sur les filtres par statut et recherche en direct pendant la saisie

Sauvegarde (localStorage)

Enregistrement des tâches à chaque changement et rechargement automatique à l'ouverture de la page
Vérification des données lues dans le localStorage avant de les utiliser
Ensemble
Filtres, recherche, tests, corrections et validation finale

Travail collaboratif sur GitHub : une branche par apprenant, des Pull Requests vérifiées par le binôme, puis fusion dans main