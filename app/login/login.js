
let users = [];
let rememberMe = false;
let rememberMeCheckbox = document.getElementById('checkboxRememberMe');
let registerBtn = document.getElementById('registerButton');
let registerEmail = document.getElementById('signupInputEmail');
let registerName = document.getElementById('signupInputName'); 
let registerPassword = document.getElementById('signupInputPassword'); 
let loginEmail = document.getElementById('loginInputEmail');
let loginPasswort = document.getElementById('loginInputPassword');


async function loginInit(){
    loadUsers();
    loadRememberMeDatas();
    changeColorsOfLoginScreen();
}


function loadRememberMeDatas() {
    let rememberMeStorage = localStorage.getItem('rememberMe');
    if(rememberMeStorage == 'true') {
        loginEmail.value = localStorage.getItem('logDataEmail');
        loginPasswort.value = localStorage.getItem('logDataPassword');
        rememberMeCheckbox.src = '../../assets/img/functionButtons/checkboxActive.png'
        rememberMe = true; 
    }
}


function rememberMeCheckboxToggle() {
    if(!rememberMe) {
        rememberMeCheckbox.src = '../../assets/img/functionButtons/checkboxActive.png'
        rememberMe = true; 
    } else {
        rememberMeCheckbox.src = '../../assets/img/functionButtons/checkbox.png'
        rememberMe = false; 
    }
}


function setRememberMeStorage() {
    if(rememberMe) {
        localStorage.setItem('logDataEmail',loginEmail.value);
        localStorage.setItem('logDataPassword',loginPasswort.value);
        localStorage.setItem('rememberMe', true);
    } else {
        localStorage.setItem('logDataEmail',null);
        localStorage.setItem('logDataPassword',null);
        localStorage.setItem('rememberMe', false);
    }
}


function login() { 
    let user = users.find((u) => u.email == loginEmail.value && u.password == loginPasswort.value);
    setRememberMeStorage();
    if (user) {
        saveActiveUserLocal(user);
        window.location.href = '../summary/summary.html';
    } else {
        showLoginFault();
    }
}


function showLoginFault() { 
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
    let activeUser = user.id;
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
        userTasks: [],
        taskCategories: []
    });
    await setItem('users', JSON.stringify(users));
    loadRegisterInLogin(); 
    backToLogin();
}


function guestLog() {
    let guest = users[0];
    loginEmail.value = guest.email; 
    loginPasswort.value = guest.password; 
    setTimeout(() => {
        login(); 
    }, 1000);
}


function loadRegisterInLogin() {
    loginEmail.value = registerEmail.value;
    loginPasswort.value = registerPassword.value;
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