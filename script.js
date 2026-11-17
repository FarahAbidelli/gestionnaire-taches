// --- ÉTAT DE L'APPLICATION ---
const STORAGE_KEY = "gestionnaire_taches_data";
const STATUTS_AUTORISES = ["à faire", "en cours", "terminée", "bloquée"];

let taches = [];
let idEnCoursEdition = null;
let idNouvelleTache = null;
let filtreActuel = "toutes";
let rechercheActuelle = "";

// --- SÉLECTEURS DOM ---
const formTache = document.getElementById("form-tache");
const titreFormulaire = document.getElementById("titre-formulaire");
const inputTitre = document.getElementById("titre");
const inputDescription = document.getElementById("description");
const selectStatut = document.getElementById("statut");
const messageErreur = document.getElementById("message-erreur");
const btnValider = document.getElementById("btn-valider");
const btnAnnuler = document.getElementById("btn-annuler");

const inputRecherche = document.getElementById("recherche");
const boutonsFiltres = document.querySelectorAll(".filtre");
const messageVide = document.getElementById("message-vide");
const listeTaches = document.getElementById("liste-taches");

// --- STOCKAGE LOCAL (localStorage) ---
function sauvegarderTaches() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taches));
}

function chargerTaches() {
  try {
    const donnees = localStorage.getItem(STORAGE_KEY);
    if (donnees) {
      taches = JSON.parse(donnees);
    }
  } catch {
    // si le localStorage est corrompu
    taches = [];
    sauvegarderTaches();
    afficherTaches();
  }
}

// --- UTILITAIRES & VALIDATION ---
function obtenirCouleurStatut(statut) {
  if (statut === "à faire") return "bleu";
  if (statut === "en cours") return "orange";
  if (statut === "terminée") return "vert";
  if (statut === "bloquée") return "rouge";
  return "bleu";
}

function validerSaisie(titre, statut) {
  if (!titre || titre.trim() === "") {
    return "Le titre de la tâche est obligatoire.";
  }
  if (!STATUTS_AUTORISES.includes(statut)) {
    return "Le statut choisi n'est pas valide.";
  }
  return "";
}

function afficherErreur(texte) {
  messageErreur.textContent = texte;
  inputTitre.setAttribute("aria-invalid", "true");
}

function effacerErreur() {
  messageErreur.textContent = "";
  inputTitre.removeAttribute("aria-invalid");
}

// --- OPÉRATIONS CRUD ---
function ajouterTache(titre, description, statut) {
  const nouvelleTache = {
    id: Date.now(),
    titre: titre.trim(),
    description: description.trim(),
    statut: statut,
    date: new Date().toLocaleDateString("fr-FR"),
    createdAt: new Date().toISOString(),
    couleur: obtenirCouleurStatut(statut),
  };
  taches.push(nouvelleTache);
  idNouvelleTache = nouvelleTache.id;
  sauvegarderTaches();
}

function modifierTache(id, titre, description, statut) {
  taches = taches.map(function (tache) {
    if (tache.id === id) {
      return {
        ...tache,
        titre: titre.trim(),
        description: description.trim(),
        statut: statut,
      };
    }
    return tache;
  });
  sauvegarderTaches();
}

function supprimerTache(id) {
  taches = taches.filter(function (tache) {
    return tache.id !== id;
  });

  if (idEnCoursEdition === id) {
    reinitialiserFormulaire();
  }

  sauvegarderTaches();
  afficherTaches();
}

// --- GESTION DU FORMULAIRE ---
function preparerModification(id) {
  const tache = taches.find(function (item) {
    return item.id === id;
  });
  if (!tache) return;

  effacerErreur();
  idEnCoursEdition = tache.id;

  inputTitre.value = tache.titre;
  inputDescription.value = tache.description;
  selectStatut.value = tache.statut;

  titreFormulaire.textContent = "Modifier la tâche";
  btnValider.textContent = "Enregistrer";
  btnAnnuler.hidden = false;

  afficherTaches();
  inputTitre.focus();
}

function reinitialiserFormulaire() {
  formTache.reset();
  idEnCoursEdition = null;
  effacerErreur();

  titreFormulaire.textContent = "Nouvelle tâche";
  btnValider.textContent = "Ajouter la tâche";
  btnAnnuler.hidden = true;
  afficherTaches();
}

function gererSoumissionFormulaire(event) {
  event.preventDefault();

  const titre = inputTitre.value;
  const description = inputDescription.value;
  const statut = selectStatut.value;

  const erreur = validerSaisie(titre, statut);
  if (erreur !== "") {
    afficherErreur(erreur);
    inputTitre.focus();
    return;
  }

  if (idEnCoursEdition !== null) {
    modifierTache(idEnCoursEdition, titre, description, statut);
  } else {
    ajouterTache(titre, description, statut);
  }

  reinitialiserFormulaire();
}

// --- COMPTEURS, FILTRAGE ET RENDU DOM ---
function mettreAJourCompteurs() {
  boutonsFiltres.forEach(function (bouton) {
    const typeFiltre = bouton.dataset.filtre;
    const spanCompteur = bouton.querySelector(".compteur");

    if (typeFiltre === "toutes") {
      spanCompteur.textContent = taches.length;
    } else {
      const totalStatut = taches.filter(function (tache) {
        return tache.statut === typeFiltre;
      }).length;
      spanCompteur.textContent = totalStatut;
    }
  });
}

function filtrerTaches() {
  const terme = rechercheActuelle.toLowerCase().trim();

  return taches.filter(function (tache) {
    const correspondStatut =
      filtreActuel === "toutes" || tache.statut === filtreActuel;

    const correspondRecherche =
      tache.titre.toLowerCase().includes(terme) ||
      tache.description.toLowerCase().includes(terme);

    return correspondStatut && correspondRecherche;
  });
}

function creerCarteTache(tache) {
  const carte = document.createElement("article");
  carte.className = "carte";
  carte.dataset.couleur = tache.couleur;

  if (tache.id === idEnCoursEdition) {
    carte.classList.add("en-edition");
  }

  if (tache.id === idNouvelleTache) {
    carte.classList.add("apparition");
  }

  // En-tête : titre + badge statut
  const entete = document.createElement("div");
  entete.className = "carte-entete";

  const titreEl = document.createElement("h3");
  titreEl.className = "carte-titre";
  titreEl.textContent = tache.titre;

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = tache.statut;

  entete.appendChild(titreEl);
  entete.appendChild(badge);

  // Description
  const descEl = document.createElement("p");
  descEl.className = "carte-description";
  if (tache.description) {
    descEl.textContent = tache.description;
  } else {
    descEl.textContent = "Aucune description.";
    descEl.classList.add("vide");
  }

  // Pied : date + boutons d'action
  const pied = document.createElement("div");
  pied.className = "carte-pied";

  const dateEl = document.createElement("span");
  dateEl.className = "carte-date";
  dateEl.textContent = "Créée le " + tache.date;

  const groupeBoutons = document.createElement("div");
  groupeBoutons.className = "carte-actions";

  const btnModifier = document.createElement("button");
  btnModifier.type = "button";
  btnModifier.className = "btn btn-secondaire btn-petit";
  btnModifier.textContent = "Modifier";
  btnModifier.addEventListener("click", function () {
    preparerModification(tache.id);
  });

  const btnSupprimer = document.createElement("button");
  btnSupprimer.type = "button";
  btnSupprimer.className = "btn btn-danger btn-petit";
  btnSupprimer.textContent = "Supprimer";
  btnSupprimer.addEventListener("click", function () {
    supprimerTache(tache.id);
  });

  groupeBoutons.appendChild(btnModifier);
  groupeBoutons.appendChild(btnSupprimer);

  pied.appendChild(dateEl);
  pied.appendChild(groupeBoutons);

  carte.appendChild(entete);
  carte.appendChild(descEl);
  carte.appendChild(pied);

  return carte;
}

function afficherTaches() {
  mettreAJourCompteurs();
  listeTaches.innerHTML = "";

  const tachesFiltrees = filtrerTaches();

  if (tachesFiltrees.length === 0) {
    messageVide.hidden = false;
    messageVide.textContent =
      taches.length === 0
        ? "Aucune tâche enregistrée pour le moment. Utilisez le formulaire à gauche pour en créer une."
        : "Aucune tâche ne correspond à vos critères de recherche ou de filtre.";
    idNouvelleTache = null;
    return;
  }

  messageVide.hidden = true;
  tachesFiltrees.forEach(function (tache) {
    const carteElement = creerCarteTache(tache);
    listeTaches.appendChild(carteElement);
  });

  idNouvelleTache = null;
}

// --- ÉCOUTEURS D'ÉVÉNEMENTS ---
formTache.addEventListener("submit", gererSoumissionFormulaire);
btnAnnuler.addEventListener("click", reinitialiserFormulaire);

inputTitre.addEventListener("input", function () {
  if (inputTitre.value.trim() !== "") {
    effacerErreur();
  }
});

inputRecherche.addEventListener("input", function (event) {
  rechercheActuelle = event.target.value;
  afficherTaches();
});

boutonsFiltres.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    boutonsFiltres.forEach(function (btn) {
      btn.classList.remove("actif");
    });
    bouton.classList.add("actif");
    filtreActuel = bouton.dataset.filtre;
    afficherTaches();
  });
});

// --- INITIALISATION ---
chargerTaches();
afficherTaches();
