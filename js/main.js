let userlogin = false;
let activeUser;
let tasksInTodo = 0;
let tasksInProgress = 0;
let tasksInAwaitFeedback = 0;
let tasksInDone = 0;
let currentDate = getCurrentDate();
let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let taskCategories = [];
let categorySelektorOpen = false;
let priority;
let taskStatus;
let newSubtasks = [];
let selectedCategory = {};
let selectedColor;
let categoryColor;
let newCategoryName;
let prioritySelect;
let selectProgressStatus = "toDo";
let selectedSubtasks = [];
const colorActions = {
  lightblue: () => {
    selectedColor = "#8AA4FF";
    categoryColor = selectedColor;
  },
  red: () => {
    selectedColor = "#FF0000";
    categoryColor = selectedColor;
  },
  green: () => {
    selectedColor = "#2AD300";
    categoryColor = selectedColor;
  },
  orange: () => {
    selectedColor = "#FF8A00";
    categoryColor = selectedColor;
  },
  pink: () => {
    selectedColor = "#E200BE";
    categoryColor = selectedColor;
  },
  blue: () => {
    selectedColor = "#0038FF";
    categoryColor = selectedColor;
  },
};

async function mainInit() {
  await includeHTML();
  await loadUsers();
  getActiveUserLocal();
  renderHeaderProfilInitials();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Load activeUser from localStorage
 */
function getActiveUserLocal() {
  activeUser = localStorage.getItem("activeUser");
}

/**
 * Rendering the header and the sidebar in the page
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * getting users initials (first letter of firstname and lastname)
 * @param {string} signUpName - username from sign up
 * @returns string with two letters
 */
function getUserInitials(signUpName) {
  let stringName = signUpName;
  let stringLetters = stringName.match(/\b(\w)/g);
  let initials;
  if (stringLetters && stringLetters.length > 0) {
    initials = stringLetters.map((letter) => letter.toUpperCase()).join("");
  } else {
    initials = "";
  }
  return initials;
}

/**
 * generating random rgb-colors
 * @returns string with rgb-color
 */
function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let rgbColor = "rgb(" + r + ", " + g + ", " + b + ")";
  return rgbColor;
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Monate werden von 0 bis 11 gezählt, daher +1
  const day = today.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function redirectToBoard() {
  window.location.href = "/board.html";
}

function renderHeaderProfilInitials() {
  document.getElementById("headerProfilInitials").innerHTML = `
      <span>${users[activeUser].initials}</span>
  `;
}


function highlightedNavbar(item) {
  noHighlightNav();
  if (item == 1) {
    highlightSelectedNav("navSummary");
  }
  if (item == 2) {
    highlightSelectedNav("navBoard");
  }
  if (item == 3) {
    highlightSelectedNav("navTask");
  }
  if (item == 4) {
    highlightSelectedNav("navContacts");

  }
  if (item == 5) {
    highlightSelectedNav("legalNotice");
  }
  if (item == 6) {
    highlightSelectedNav("privacyPolicy");
  }
}

function highlightSelectedNav(element) {
  document.getElementById(`${element}`).classList.add("navHighlighted");
}

function noHighlightNav() {
  let navElements = document.querySelectorAll("a.sidebarBox");
  for (let i = 0; i < navElements.length; i++) {
    const element = navElements[i];
    element.classList.remove("navHighlighted");
  }
}

// Help
function hoverBackArrow(arrowID) {
  let arrow = document.getElementById(arrowID);
  arrow.src = "../assets/img/functionButtons/arrowHover.png";
}

function leaveBackArrow(arrowID) {
  let arrow = document.getElementById(arrowID);
  arrow.src = "/assets/img/functionButtons/arrowDefault.png";
}

function openInfo() {
  let container = document.getElementById("info-container");
  container.classList.remove("d-none");
}

function closeInfo() {
  let container = document.getElementById("info-container");
  container.classList.add("d-none");
}

// Privacy Policy
async function privacyPolicyInit() {
  await mainInit();
  highlightedNavbar(6);
}

// Legal Notice
async function legalNoticeInit() {
  await mainInit();
  highlightedNavbar(5);
}

//Head Menu
function headMenu() {
  document.getElementById("headMenu").classList.toggle("d-none");
}
