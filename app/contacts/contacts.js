let contactContent = document.getElementById("contactsContent");

async function contactsInit() {
  await mainInit();
  renderContactsCards();
}

function renderContactsCards() {
  contactContent.innerHTML = "";
  if (users[activeUser].contacts) {
    for (let i = 0; i < users[activeUser].contacts.length; i++) {
      contactContent.innerHTML += templateContact(users[activeUser].contacts[i],i);
    }
  } else {
    contactContent.innerHTML = noContact();
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
