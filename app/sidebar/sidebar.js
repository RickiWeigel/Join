function highlightedNavbar(item) {
    noHighlightNav();

    if (item == 1) {
        highlightSelectedNav('navSummary');
        // highlightSelectedNav('navSummary-mobile');
    }
    if (item == 2) {
        highlightSelectedNav('navBoard');
        // highlightSelectedNav('navBoard-mobile');
    }
    if (item == 3) {
        highlightSelectedNav('navTask');
        // highlightSelectedNav('navTask-mobile');
    }
    if (item == 4) {
        highlightSelectedNav('navContacts');
        // highlightSelectedNav('navContacts-mobile');
    }
    if (item == 5) {
        highlightSelectedNav('legalNotice');
    }
}

function highlightSelectedNav(element) {
    document.getElementById(`${element}`).classList.add('navHighlighted');
}

function noHighlightNav() {
    let navElements = document.querySelectorAll('a.sidebarBox');

    for (let i = 0; i < navElements.length; i++) {
        const element = navElements[i];
        element.classList.remove('navHighlighted');
    }
}