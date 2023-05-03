let contactContent = document.getElementById('contactsContent');

async function contactsInit() {
    await mainInit(); 
    //renderContacts();
    renderContactsCards();
}


function renderContacts() {

}


function renderContactsCards() {
    for(let i = 0; i < users[activeUser].contacts.length; i++) {
        contactContent.innerHTML += templateContact(users[activeUser].contacts[i], i);
    }
}


function templateContact(contact, index) {
    return `
    <div id="contactID${index}" class="contactCard">
        <div class="contactAvatar" style="background-color:${contact.color}">
            <span class="contactInitials">${contact.initials}</span>
        </div>
        <div class="contactData">
            <div class="dataName">${contact.name}</div>
            <div class="dataMail">${contact.email}</div>
        </div>
    </div>
    `
}