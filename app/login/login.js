
let users = [];
let activeUser;
let registerBtn = document.getElementById('registerButton');
let registerEmail = document.getElementById('signupInputEmail');
let registerName = document.getElementById('signupInputName'); 
let registerPassword = document.getElementById('signupInputPassword'); 
let loginEmail = document.getElementById('loginInputEmail');
let loginPasswort = document.getElementById('loginInputPassword');


async function loginInit(){
    loadUsers();
    changeColorsOfLoginScreen();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


function login() { 
    let user = users.find((u) => u.email == loginEmail.value && u.password == loginPasswort.value);
    if (user) {
        saveActiveUserLocal(user);
        window.location.href = '../summary/summary.html';
    } else {
        showLoginFault();
    }
}


function showLoginFault() { // Ja ricki ist noch nicht gut ich muss später nochmal drann ich weis :) 
    let mail = users.find((m) => m.email == loginEmail.value);

    if (!mail) {
        document.getElementById('loginFaultEmail').classList.remove('d-none');
        document.getElementById('loginFaultPassword').classList.add('d-none');
    } else {
        document.getElementById('loginFaultPassword').classList.remove('d-none');
        document.getElementById('loginFaultEmail').classList.add('d-none');
        loginPasswort.value = '';
        loginPasswort.placeholder = 'Please try again!';
    }
}


function saveActiveUserLocal(user) {
    let activeUser = user.userId;
    localStorage.setItem('activeUser', activeUser);
}


async function register() {
    registerBtn.disabled = true;
    users.push({
        id: users.length,
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
        color: getRandomColor(),
        initials: getUserInitials(registerName.value),
        contacts: [],
        userTasks: []
    });
    await setItem('users', JSON.stringify(users));
    loadRegisterInLogin(); 
    backToLogin();
}


function loadRegisterInLogin() {
    loginEmail.value = registerEmail.value;
    loginPasswort.value = registerPassword.value;
}


/**
 * generating random rgb-colors
 * @returns string with rgb-color
 */
function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let rgbColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return rgbColor;
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
 * go back to login section 
 */
function backToLogin() {
    document.getElementById('loginBox').classList.remove('d-none');
    document.getElementById('signupBox').classList.add('d-none');
    document.getElementById('forgotBox').classList.add('d-none');
    document.getElementById('resetbox').classList.add('d-none');
    document.getElementById('loginLogoWhite').classList.add('no-opacity');
    document.getElementById('loginLogoBlue').classList.remove('no-opacity');
    document.getElementById('loginPage').classList.add('pageColorChange');
    document.getElementById('loginSignupBox').classList.remove('d-none');
}


/**
 * load forget password section 
 */
function showForgetPasswortSection() {
    document.getElementById('loginBox').classList.add('d-none');
    document.getElementById('forgotBox').classList.remove('d-none');
    document.getElementById('loginLogoWhite').classList.remove('no-opacity');
    document.getElementById('loginLogoBlue').classList.add('no-opacity');
    document.getElementById('loginPage').classList.remove('pageColorChange');
    document.getElementById('loginSignupBox').classList.add('d-none');
}


/**
 * show sign up section 
 */
function loadSignUpBox() {
    document.getElementById('loginBox').classList.add('d-none');
    document.getElementById('signupBox').classList.remove('d-none');
    document.getElementById('loginLogoWhite').classList.remove('no-opacity');
    document.getElementById('loginLogoBlue').classList.add('no-opacity');
    document.getElementById('loginPage').classList.remove('pageColorChange');
    document.getElementById('loginSignupBox').classList.add('d-none');
}


/**
 * changing the colors of the login screen and moving the logo to the left after 1 second
 */
function changeColorsOfLoginScreen() {
    setTimeout(() => {
        document.getElementById('loginPage').classList.add('pageColorChange');
        document.getElementById('loginLogoWhite').classList.add('logoMovement');
        document.getElementById('loginLogoWhite').classList.add('no-opacity');
        document.getElementById('loginLogoBlue').classList.add('logoMovement');
        document.getElementById('loginLogoBlue').classList.remove('no-opacity');
        document.getElementById('loginBox').classList.remove('no-opacity');
        document.getElementById('loginSignupBox').classList.remove('no-opacity');
    }, 1000);
}