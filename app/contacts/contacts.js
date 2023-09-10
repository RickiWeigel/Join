let contactContent = document.getElementById("contactsContent");

async function contactsInit() {
  await mainInit();
  highlightedNavbar(4);
}

function test() {
  console.log("test");
}

function slideInPopup() {
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById(
    "slide-container-add-contact"
  );
  popupContent.classList.remove("add-contact-slide-out-right");
  popupContainer.classList.remove("hidePopup");
  popupContainer.classList.add("containerPopupActive");
  popupContent.classList.add("add-contact-slide-in-right");
}

function slideOutPopup() {
  const popupContainer = document.getElementById("popupContainer");
  const popupContent = document.getElementById("slide-container-add-contact");
  popupContent.classList.remove("add-contact-slide-in-right");
  popupContent.classList.add("add-contact-slide-out-right");
  popupContainer.classList.remove("containerPopupActive");
  popupContainer.classList.add("hidePopup");
}
