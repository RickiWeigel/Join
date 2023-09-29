let contactContent = document.getElementById("contactsContent");
let hidePopupStatus;
let groupedContacts = {};

async function contactsInit() {
  await mainInit();
  highlightedNavbar(4);
  sortContactsIntoAlphabetCards(users);
}

function slideInPopupAddContact() {
  hidePopupStatus = false;
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-add-contact");
  popupContent.classList.remove("d-none");
  popupContent.classList.remove("add-contact-slide-out-right");
  popupContainer.classList.add("containerPopupActive");
  popupContent.classList.add("add-contact-slide-in-right");
}

function slideOutPopupAddContact() {
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-add-contact");
  popupContent.classList.remove("add-contact-slide-in-right");
  popupContent.classList.add("add-contact-slide-out-right");
  popupContainer.classList.remove("containerPopupActive");
  popupContent.classList.add("d-none");
  hidePopupStatus = true;
}

function slideInPopupEdit(id) {
  renderContactsEdit(id);
  hidePopupStatus = false;
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-edit-contact");
  popupContent.classList.remove("edit-slide-out");
  popupContent.classList.remove("d-none");
  popupContainer.classList.add("containerPopupActive");
  popupContent.classList.add("edit-slide-in");
}

function slideOutPopupEdit() {
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-edit-contact");
  popupContent.classList.remove("edit-slide-in");
  popupContent.classList.add("edit-slide-out");
  popupContainer.classList.remove("containerPopupActive");
  popupContent.classList.add("d-none");
  hidePopupStatus = true;
}

async function addNewContact() {
  let newName = document.getElementById("add-content-input-name").value;
  let newMail = document.getElementById("add-content-input-email").value;
  let newPhone = document.getElementById("add-content-input-phone").value;
  let newInitials = getUserInitials(newName);
  let newUserColor = getRandomColor();

  users[activeUser].contacts.push({
    id: users[activeUser].idCounter,
    name: newName,
    email: newMail,
    phone: newPhone,
    initials: newInitials,
    color: newUserColor,
  });
  users[activeUser].idCounter++;
  await setItem(`users`, JSON.stringify(users));
  slideOutPopupAddContact();
  sortContactsIntoAlphabetCards(users);
  clearAddNewContactInnputs();
}

function clearAddNewContactInnputs() {
  document.getElementById("add-content-input-name").value = "";
  document.getElementById("add-content-input-email").value = "";
  document.getElementById("add-content-input-phone").value = "";
}

async function sortContactsIntoAlphabetCards(users) {
  groupedContacts = {};
  const user = users[activeUser];

  await groupContactsByInitial(user, groupedContacts);

  const reversedKeys = Object.keys(groupedContacts).reverse();
  const reversedGroupedContacts = {};
  reversedKeys.forEach((key) => {
    reversedGroupedContacts[key] = groupedContacts[key];
  });
  renderAlphabetCards(
    sortGroupedContactsAlphabetically(reversedGroupedContacts)
  );
}

async function groupContactsByInitial(user, groupedContacts) {
  if (user.contacts && Array.isArray(user.contacts)) {
    user.contacts.forEach((contact) => {
      const initial = contact.name.charAt(0).toUpperCase();
      if (!groupedContacts[initial]) {
        groupedContacts[initial] = [];
      }
      groupedContacts[initial].push(contact);
    });
  }
}

function sortGroupedContactsAlphabetically(groupedContacts) {
  const sortedGroupedContacts = {};
  const keys = Object.keys(groupedContacts).sort();

  keys.forEach((key) => {
    sortedGroupedContacts[key] = groupedContacts[key];
  });

  return sortedGroupedContacts;
}

function renderAlphabetCards(groupedContacts) {
  document.getElementById("contacts-content").innerHTML = ``;
  const alphabetContainer = document.getElementById("contacts-content");

  for (const initial in groupedContacts) {
    // Fügen Sie für jeden Buchstaben eine Alphabet-Karte hinzu
    alphabetContainer.innerHTML += `
              <div class="alphabet-card">
                  <span>${initial}</span>
              </div>
              <div class="contact-card-container" id="contact-card-container-${initial}">
              <!-- Hier können Sie die Kontaktkarten für diesen Buchstaben hinzufügen -->
              ${renderContactCards(groupedContacts[initial])}
              </div>
          `;
  }
  groupedContacts = {};
}

function renderContactCards(contacts) {
  let contactCardsHTML = "";
  contacts.forEach((contact) => {
    contactCardsHTML += `
      <div class="contact-card" onclick="renderContactDetails(${contact.id})" id="profil-data-${contact.id}">
      <div class="profil-pic-min" style="background-color: ${contact.color};">
        <span>${contact.initials}</span>
      </div>
      <div class="profil-data"">
        <div class="profil-name" id="profil-name"><span>${contact.name}</span></div>
        <div class="profil-email" id="profil-email"><span>${contact.email}</span></div>
      </div>
    </div>
      `;
  });
  return contactCardsHTML;
}

function breakLine(contact) {
  var name = contact.name;
  var newName = name.replace(/@/g, "@<br>");
  return newName;
}

function renderContactDetails(id) {
  let indexInArray = findContactById(id);
  let contact = users[activeUser].contacts[indexInArray];
  let contactDetailContainer = document.getElementById(
    "contactDetailContainer"
  );
  contactDetailContainer.classList.remove("contacts-details-slide-out-right");
  contactDetailContainer.classList.add("contacts-details-slide-in-right");
  contactDetailContainer.classList.remove("d-none");
  contactDetailContainer.innerHTML = `
    ${renderContactDetailsTemplateHead(id, contact)}
    ${renderContactDetailsTemplateInfos(contact)}
  `;
}

function closeContactsDetails() {
  let contactDetailContainer = document.getElementById(
    "contactDetailContainer"
  );
  contactDetailContainer.classList.remove("contacts-details-slide-in-right");
  contactDetailContainer.classList.add("contacts-details-slide-out-right");
  contactDetailContainer.classList.add("d-none");
}

function renderContactsEdit(id) {
  let indexInArray = findContactById(id);
  let contact = users[activeUser].contacts[indexInArray];
  document.getElementById("slide-container-edit-contact").innerHTML = `
  ${renderContactsEditTemplate(id, contact)}
  `;
}

async function addEditContact(id) {
  let contactIndex = findContactById(id);
  let contact = users[activeUser].contacts[contactIndex];
  let newName = document.getElementById("edit-content-input-name").value;
  let newEmail = document.getElementById("edit-content-input-email").value;
  let newPhone = document.getElementById("edit-content-input-phone").value;
  contact.name = newName;
  contact.email = newEmail;
  contact.phone = newPhone;
  contact.initials = getUserInitials(newName);
  await setItem(`users`, JSON.stringify(users));
  renderContactsEdit(id);
  sortContactsIntoAlphabetCards(users);
  renderContactDetails(id);
  setTimeout(slideOutPopupEdit, 500);
}

async function contactDelete(id) {
  let indexInArray = findContactById(id);
  let contact = users[activeUser].contacts;
  contact.splice(indexInArray, 1)[0]; // Das gelöschte Subtask-Element

  document.getElementById("contactDetailContainer").innerHTML = ``;
  await setItem(`users`, JSON.stringify(users));
  sortContactsIntoAlphabetCards(users);
  slideOutPopupEdit();
}

function findContactById(index) {
  const userContacts = users[activeUser].contacts;
  for (let i = 0; i < userContacts.length; i++) {
    if (userContacts[i].id === index) {
      return i;
    }
  }
  return null;
}
