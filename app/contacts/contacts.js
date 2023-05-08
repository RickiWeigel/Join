let contactContent = document.getElementById("contactsContent");

async function contactsInit() {
  await mainInit();
  renderContacts();
}

function renderContacts() {
    const contacts = users[activeUser].contacts;
    let contactList = "";
  
    // Erstelle ein Set aller ersten Buchstaben
    const firstLetters = new Set(contacts.map((contact) => contact.name.charAt(0).toUpperCase()));
    
    // Sortiere die ersten Buchstaben und erstelle eine Karte für jeden Buchstaben
    [...firstLetters].sort().forEach((letter) => {
        const alphabet = contacts
          .filter((contact) => contact.name.charAt(0).toUpperCase() === letter)
          .sort((a, b) => a.name.localeCompare(b.name));
        contactList += alphabetCardTemplate(letter.toUpperCase());
        alphabet.forEach((contact, index) => {
          contactList += contactCardTemplate(contact, index);
        });
      });
  
    renderContactCards(contactList);
}


function renderContactCards(contactList) {
    const content = document.getElementById("contactsContent");
    content.innerHTML = contactList || noContact();
}

function getContactsGroupedByFirstLetter(contactsArray) {
    const groups = new Map();
    for (const contact of contactsArray) {
        console.log(contact);
        let firstLetter = contact.initials.charAt(0);
        if (!groups.has(firstLetter)) {
            groups.set(firstLetter, []);
        }
        groups.get(firstLetter).push(contact);
    }
    const sortedGroups = [...groups.entries()].sort();
    return sortedGroups.map(([letter, contacts]) => ({ letter, contacts }));
}


function getIndexOfContact(search) {
    let contactsArray = users[activeUser].contacts;
    let index;
    contactsArray.find((c, i) => {
        if (c.contactEmail == search) {
            index = i;
        }
    });
    return index;
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
    `;
}

function noContact() {
  return /*html*/ `
        <div class="noContact">
            <span class="noContactText">You have no contacts in your list. Add new contacts with the button "Add contact".</span>
        </div>
    `;
}

function contactDetailView(contact, index) {
  return /*html*/ `
        <div class="contacts-detail-top">
            <img class="contact-detail-back" src="./assets/img/arrow_left.png" alt="Back" onclick="closeContactDetailView()">
            <div class="contact-pic-detail" style="background-color:${contact.color}">
                <span class="contact-initials-detail">${contact.initials}</span>
            </div>
            <div class="contact-detail-name-box">
                <span class="contact-detail-name">${contact.name}</span>
                <div onclick="toggleAddTaskPopup(1, 1, 'in')" class="contact-detail-task"><span class="plus">+ </span>Add task</div>
            </div>
        </div>
        <div class="contacts-detail-bottom">
            <div class="contact-detail-info">
                <span class="info-headline">Contact information</span>
                <span class="info-subheadline">Email</span>
                <a href="mailto:${contact.email}"><span class="info-email">${contact.email}</span></a>
                <span class="info-subheadline">Phone</span>
                <a href="tel:${contact.phone}"><span class="info-phone">${contact.phone}</span></a>
            </div>
            <div class="contact-detail-change" onclick="showEditContactPopUp(${index})">
                <img class="change-icon" src="./assets/img/icons/icon_edit_contact.png" alt="Edit contact">
                <img class="change-icon-mobile" src="./assets/img/editButton.png" alt="Edit contact">
                <span class="change-icon-text">Edit contact</span>
            </div>
        </div>
    `;
}


function alphabetCardTemplate(letter) {
    return /*html*/ `
    <div class="alphabetCard">
        <span class="alphabetLetter">${letter}</span>
    </div>
    `;
}


function contactCardTemplate(contact, index) {  
    return /*html*/ `
        <div id="contact-id-${index}" class="contactCard" onclick="openContactDetailView(${index})">
            <div class="contactPic" style="background-color:${contact.color}">
                <span class="contactInitials">${contact.initials}</span>
            </div>
            <div class="contact-data">
                <div class="dataName" title="${contact.name}">${contact.name}</div>
                <div class="dataMail" title="${contact.email}">${contact.email}</div>
            </div>
        </div>
    `;
}