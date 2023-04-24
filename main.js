//loadJSONFromServer();  TODO



async function init() {
    await includeHTML();
    loadLogin();
}


/**
 * Rendering the header and the sidebar in the page
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * load the login page 
 */
function loadLogin() {
    window.location.href = 'app/login/login.html';
}