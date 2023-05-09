let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let contactSelector;
let taskCategories = [];
let categorySelektorOpen;
let subTask;
let priority;
let taskStatus;
let selectedCategory;


async function addTaskInit() {
  mainInit();
  // getActiveUserLocal();
}

// Show Date (jquery)
$(function () {
  $("#datepicker").datepicker({
    inline: true,
    changeMonth: true,
    changeYear: true,
  });
});


function clearBtnOnHover(){
  document.getElementById('clearBtn').src = "/assets/img/functionButtons/icon_cancel_blue.png";
}


function clearBtnLeaveHover(){
  document.getElementById('clearBtn').src = "/assets/img/functionButtons/icon_cancel.png";
}


function renderContactsToAssign() {
  if (!contactsSelektorOpen) {
    for (let i = 0; i < users[activeUser].contacts.length; i++) {
      document.getElementById("contactsToAssign").innerHTML += `
      <div onclick="contactCheckbox(${i})" class="dropdown-content"><span>${users[activeUser].contacts[i].name}</span><img id="contactSelector[${i}]"  src="/assets/img/functionButtons/checkButton.png"></div>
      `;
    }
    document.getElementById("contactsToAssign").innerHTML += `
    <div onclick="showInviteNewContact()" class="dropdown-content"><span>Invite new contact</span><img src="/assets/img/functionButtons/contactIcon.png"></div>
    `;
    contactsSelektorOpen = true;
  } else {
    document.getElementById("contactsToAssign").innerHTML = ``;
    contactsSelektorOpen = false;
  }
}

function renderCategories() {
  if (!categorySelektorOpen) {
    document.getElementById("selectTaskCategory").innerHTML = `
  <div onclick="showNewCategory()" class="dropdown-content"><span>New category</span></div>
  `;
    for (let i = 0; i < users[activeUser].taskCategories.length; i++) {
      document.getElementById("selectTaskCategory").innerHTML += `
    <div onclick="setSelectedCategory("${users[activeUser].taskCategories[i].categoryName}")" class="dropdown-content"><span>${users[activeUser].taskCategories[i].categoryName}</span></div>
    `;
    }
    categorySelektorOpen = true;
  } else {
    document.getElementById("selectTaskCategory").innerHTML = ``;
    categorySelektorOpen = false;
  }
}

function contactCheckbox(id) {
  if (contactSelector) {
    document.getElementById(`contactSelector[${id}]`).src =
      "/assets/img/functionButtons/checkButton.png";
    //entfernt aktivierten Kontakt
    let index = selectedContactsToAssign.indexOf(
      users[activeUser].contacts[id]
    );
    if (index > -1) {
      selectedContactsToAssign.splice(index, 1);
    }
    contactSelector = false;
  } else {
    //fügt aktivierten Kontakt hinzu
    selectedContactsToAssign.push(users[activeUser].contacts[id]);
    document.getElementById(`contactSelector[${id}]`).src =
      "/assets/img/functionButtons/checkButtonChecked.png";
    contactSelector = true;
  }
}

async function addTask() {
  let taskInputTitle = document.getElementById("taskTitle");
  let date = document.getElementById("datepicker");
  let description = document.getElementById("description");
  users[activeUser].userTasks.push({
    taskTitle: taskInputTitle.value,
    taskDescription: description.value,
    toDueDate: date.value,
    taskID: users[activeUser].userTasks.length,
    assignedTo: selectedContactsToAssign,
  });
  await setItem(`users`, JSON.stringify(users));
  resetInput();
}

function resetInput() {
  taskInputTitle = document.getElementById("taskTitle").value = "";
  date = document.getElementById("datepicker").value = "";
  description = document.getElementById("description").value = "";
}

function showInviteNewContact() {
  document.getElementById("showInviteNewContact").classList.remove("d-none");
  document.getElementById("selectContacts").classList.add("d-none");
  document.getElementById("contactsToAssign").classList.add("d-none");
}

function hideInviteNewContact() {
  document.getElementById("showInviteNewContact").classList.add("d-none");
  document.getElementById("selectContacts").classList.remove("d-none");
  document.getElementById("contactsToAssign").classList.add("d-none");
  renderContactsToAssign()
}


async function addNewInviteContact() {
  let contactEmail = document.getElementById("inviteNewContact").value;
  users[activeUser].contacts.push({
    name: contactEmail,
    email: 'contactEmail',
    phone: '',
    initials: '',
    color: getRandomColor(),
  });
  await setItem(`users`, JSON.stringify(users));
  document.getElementById("inviteNewContact").value = '';
  hideInviteNewContact()
  renderContactsToAssign()
}


async function setSelectedCategory(value){
  selectedCategory = value;
}


async function addNewCategory (){

}


function showNewCategory() {
  document.getElementById("showNewCategory").classList.remove("d-none");
  document.getElementById("showCategory").classList.add("d-none");
  document.getElementById("selectTaskCategory").classList.add("d-none");
}


function hideNewCategory() {
  document.getElementById("showNewCategory").classList.add("d-none");
  document.getElementById("showCategory").classList.remove("d-none");
  document.getElementById("selectTaskCategory").classList.remove("d-none");
  renderCategories()
}