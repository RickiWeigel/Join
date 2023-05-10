//loadJSONFromServer();  TODO
let userlogin = false;
let activeUser;

async function mainInit() {
  await includeHTML();
  await loadUsers(); 
  getActiveUserLocal();
}

async function loadUsers(){
  try {
      users = JSON.parse(await getItem('users'));
  } catch(e){
      console.error('Loading error:', e);
  }
}


/**
 * Load activeUser from localStorage
 */
function getActiveUserLocal() {
  activeUser = localStorage.getItem('activeUser');
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

  if (stringLetters.length > 1) {
      initials = stringLetters[0] + stringLetters[1];
  } else {
      initials = stringLetters[0];
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
  let rgbColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  return rgbColor;
}