let users = [];
let rememberMe = false;
// let checkboxRememberMe = document.getElementById("checkboxRememberMe");
// let registerBtn = document.getElementById("registerButton");
// let registerEmail = document.getElementById("signupInputEmail");
// let signupInputName = document.getElementById("signupInputName");
// let signupInputPassword = document.getElementById("signupInputPassword");
// let loginInputEmail = document.getElementById("loginInputEmail");
// let loginInputPassword = document.getElementById("loginInputPassword");

async function loginInit() {
  loadUsers();
  loadRememberMeDatas();
  changeColorsOfLoginScreen();
}

function loadRememberMeDatas() {
  let rememberMeStorage = localStorage.getItem("rememberMe");
  if (rememberMeStorage == "true") {
    loginInputEmail.value = localStorage.getItem("logDataEmail");
    loginInputPassword.value = localStorage.getItem("logDataPassword");
    checkboxRememberMe.src =
      "../../assets/img/functionButtons/checkboxActive.png";
    rememberMe = true;
  }
}

function rememberMeCheckboxToggle() {
  if (!rememberMe) {
    checkboxRememberMe.src =
      "../../assets/img/functionButtons/checkboxActive.png";
    rememberMe = true;
  } else {
    checkboxRememberMe.src = "../../assets/img/functionButtons/checkbox.png";
    rememberMe = false;
  }
}

function setRememberMeStorage() {
  if (rememberMe) {
    localStorage.setItem("logDataEmail", loginInputEmail.value);
    localStorage.setItem("logDataPassword", loginInputPassword.value);
    localStorage.setItem("rememberMe", true);
  } else {
    localStorage.setItem("logDataEmail", null);
    localStorage.setItem("logDataPassword", null);
    localStorage.setItem("rememberMe", false);
  }
}

function login() {
  let user = users.find(
    (u) => u.email == loginInputEmail.value && u.password == loginInputPassword.value
  );
  setRememberMeStorage();
  if (user) {
    saveActiveUserLocal(user);
    window.location.href = "/summary.html";
  } else {
    showLoginFault();
  }
}

function showLoginFault() {
  let mail = users.find((m) => m.email == loginInputEmail.value);

  if (!mail) {
    document.getElementById("loginFaultEmail").classList.remove("d-none");
    document.getElementById("loginFaultPassword").classList.add("d-none");
  } else {
    document.getElementById("loginFaultPassword").classList.remove("d-none");
    document.getElementById("loginFaultEmail").classList.add("d-none");
    loginInputPassword.value = "";
    loginInputPassword.placeholder = "Please try again!";
  }
}

function saveActiveUserLocal(user) {
  let activeUser = user.id;
  localStorage.setItem("activeUser", activeUser);
}

async function register() {
  registerButton.disabled = true;
  users.push({
    id: users.length,
    name: signupInputName.value,
    email: signupInputEmail.value,
    password: signupInputPassword.value,
    color: getRandomColor(),
    initials: getUserInitials(signupInputName.value),
    contacts: [],
    userTasks: [],
    taskCategories: [],
    idCounter: 0,
  });
  await setItem("users", JSON.stringify(users));
  loadRegisterInLogin();
  backToLogin();
}

function guestLog() {
  let guest = users[0];
  loginInputEmail.value = guest.email;
  loginInputPassword.value = guest.password;
  setTimeout(() => {
    login();
  }, 1000);
}

function loadRegisterInLogin() {
  loginInputEmail.value = signupInputEmail.value;
  loginInputPassword.value = signupInputPassword.value;
}

/**
 * go back to login section
 */
function backToLogin() {
  loginBox.classList.remove("d-none");
  signupBox.classList.add("d-none");
  forgotBox.classList.add("d-none");
  resetbox.classList.add("d-none");
  loginLogoWhite.classList.add("no-opacity");
  loginLogoBlue.classList.remove("no-opacity");
  loginPage.classList.add("pageColorChange");
  loginSignupBox.classList.remove("d-none");
}

/**
 * show sign up section
 */
function loadSignUpBox() {
  loginBox.classList.add("d-none");
  signupBox.classList.remove("d-none");
  loginLogoWhite.classList.remove("no-opacity");
  loginLogoBlue.classList.add("no-opacity");
  loginPage.classList.remove("pageColorChange");
  loginSignupBox.classList.add("d-none");
}

/**
 * changing the colors of the login screen and moving the logo to the left after 1 second
 */
function changeColorsOfLoginScreen() {
  setTimeout(() => {
    loginPage.classList.add("pageColorChange");
    loginLogoWhite.classList.add("logoMovement");
    loginLogoWhite.classList.add("no-opacity");
    loginLogoBlue.classList.add("logoMovement");
    loginLogoBlue.classList.remove("no-opacity");
    loginBox.classList.remove("no-opacity");
    loginSignupBox.classList.remove("no-opacity");
  }, 1000);
}
