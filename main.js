//loadJSONFromServer();  TODO
let userlogin = false;

async function mainInit() {
  await includeHTML();
  await loadUsers();
  //loadLogin();
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
  let activeUser = localStorage.getItem('activeUser');
  return activeUser;
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

function loadLogin() { // todo
  window.location.href = "/app/login/login.html";
}
