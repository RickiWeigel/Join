let contactContent = document.getElementById('contactsContent');

async function contactsInit() {
    await mainInit(); 
    renderContacts();
    renderContactsCards();
}


function renderContacts() {
    
}


function renderContactsCards() {
    for(let i = 0; i < users[activeUser].contacts.length; i++) {
        contactContent.innerHTML += users[activeUser].contacts[i];
    }
}