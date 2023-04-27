let tasks = [];
let contacts = ["user1", "user2", "user3", "user4", "user5"];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let loginCheckedBox;

async function addTaskInit() {
  getActiveUserLocal();
  loadUsers();
}

// Show Date
$(function () {
  $("#datepicker").datepicker({
    inline: true,
    changeMonth: true,
    changeYear: true,
  });
});

function renderContactsToAssign() {
  if (contactsSelektorOpen === false) {
    for (let i = 0; i < contacts.length; i++) {
      document.getElementById("contactsToAssign").innerHTML += `
      <div onclick="loginCheckbox(${i})" class="singleContact"><span>${contacts[i]}</span><img id="contactSelector[${i}]"  src="/assets/img/functionButtons/checkButton.png"></div>
      `;
    }
    contactsSelektorOpen = true;
  } else {
    document.getElementById("contactsToAssign").innerHTML = ``;
    contactsSelektorOpen = false;
  }
}

function loginCheckbox(id) {
  if (loginCheckedBox) {
    document.getElementById(`contactSelector[${id}]`).src =
      "/assets/img/functionButtons/checkButton.png";

    //entfernt aktivierten Kontakt
    let index = selectedContactsToAssign.indexOf(contacts[id]);
    if (index > -1) {
      selectedContactsToAssign.splice(index, 1);
    }

    loginCheckedBox = false;

  } else {
    //fügt aktivierten Kontakt hinzu
    selectedContactsToAssign.push(contacts[id]);


    document.getElementById(`contactSelector[${id}]`).src =
      "/assets/img/functionButtons/checkButtonChecked.png";
    loginCheckedBox = true;
  }
}


