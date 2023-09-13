let contactContent = document.getElementById("contactsContent");
let hidePopupStatus;


async function contactsInit() {
  await mainInit();
  highlightedNavbar(4);
}

function test() {
  console.log("test");
}

function slideInPopupAddContact() {
  hidePopupStatus = false;
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-add-contact");
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
  hidePopupStatus = true;
}


function slideInPopupEdit() {
  hidePopupStatus = false;
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-edit-contact");
  popupContent.classList.remove("edit-slide-out");
  popupContainer.classList.add("containerPopupActive");
  popupContent.classList.add("edit-slide-in");
  console.log(users);
}

function slideOutPopupEdit() {
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-edit-contact");
  popupContent.classList.remove("edit-slide-in");
  popupContent.classList.add("edit-slide-out");
  popupContainer.classList.remove("containerPopupActive");
  hidePopupStatus = true;
}



function sortAndGroupContactsByInitial() {
 let contacts = users[activeUser].contacts;
  
  // Ein leeres Objekt erstellen, um die Kontakte nach Anfangsbuchstaben zu gruppieren
  const contactRegisters = {};

  // Durch jeden Kontakt iterieren
  for (const contact of contacts) {
    const initial = contact.name.charAt(0).toUpperCase(); // Erster Buchstabe des Namens extrahieren und in Großbuchstaben umwandeln

    // Wenn das Register für diesen Anfangsbuchstaben noch nicht existiert, erstellen Sie es
    if (!contactRegisters[initial]) {
      contactRegisters[initial] = [];
    }

    // Kontakt zum entsprechenden Register hinzufügen
    contactRegisters[initial].push(contact);
  }

  // Die Kontaktregister nach dem Anfangsbuchstaben sortieren
  const sortedRegisters = {};
  Object.keys(contactRegisters).sort().forEach(initial => {
    sortedRegisters[initial] = contactRegisters[initial];
  });

  return sortedRegisters;
}
