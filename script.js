// --- ÉTAT DE L'APPLICATION ---
const STORAGE_KEY = "gestionnaire_taches";
const STATUTS_AUTORISES = ["à faire", "en cours", "terminée", "bloquée"];

let taches = [];
let filtreStatutActuel = "toutes";
let rechercheActuelle = "";

// --- SÉLECTEURS DOM ---
const taskForm = document.getElementById("task-form");
const taskIdInput = document.getElementById("task-id");
const taskTitleInput = document.getElementById("task-title");
const taskDescInput = document.getElementById("task-desc");
const taskStatusInput = document.getElementById("task-status");
const formHeading = document.getElementById("form-heading");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formError = document.getElementById("form-error");

const searchInput = document.getElementById("search-input");
const filterStatusSelect = document.getElementById("filter-status");
const tasksContainer = document.getElementById("tasks-container");
const emptyMessage = document.getElementById("empty-message");
