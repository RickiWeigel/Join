
let users = [];
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


async function register() {
    registerBtn.disabled = true;
    users.push({
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
    });
    await setItem('users', JSON.stringify(users));
    loadRegisterValue(); 
    backToLogin();
}


function loadRegisterValue() {
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