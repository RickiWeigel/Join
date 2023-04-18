/**
 * init function when body loads in index.html
 */
function loginInit() {
    changeColorsOfLoginScreen();
}



/**
 * todo
 */
function loadSignUpBox() {

}

/**
 * todo
 */
function loginUser() {

}

/**
 * todo
 */
function registerNewUser() {

}

/**
 * todo
 */
function backToLogin() {

}


/**
 * todo
 */

function sendResetEmail() {
    
}/**
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