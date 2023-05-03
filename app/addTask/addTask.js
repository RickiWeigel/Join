let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let contactSelector;
let taskCategories = [];
let categorySelektorOpen;
let subTask;
let priority;
let assignedTo = selectedContactsToAssign;
let taskStatus;

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
  <div class="dropdown-content"><span>New category</span></div>
  `;
    for (let i = 0; i < users[activeUser].taskCategories.length; i++) {
      document.getElementById("selectTaskCategory").innerHTML += `
    <div class="dropdown-content"><span>${users[activeUser].taskCategories[i].categoryName}</span></div>
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
    let index = selectedContactsToAssign.indexOf(users[activeUser].contacts[id]);
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
  });
  await setItem(`users`, JSON.stringify(users));
  resetInput();
}

function resetInput() {
  taskInputTitle = document.getElementById("taskTitle").value = "";
  date = document.getElementById("datepicker").value = "";
  description = document.getElementById("description").value = "";
}

function test() {
  taskCategories.push(
    {
      categoryName: "test1",
      color: "255 255 255",
    },
    {
      categoryName: "test2",
      color: "255 255 255",
    }
  );
}


function showInviteNewContact(){
  document.getElementById('showInviteNewContact').classList.remove('d-none');
  document.getElementById('selectContacts').classList.add('d-none');
  document.getElementById('contactsToAssign').classList.add('d-none');  
}


function hideInviteNewContact(){
  document.getElementById('showInviteNewContact').classList.add('d-none');
  document.getElementById('selectContacts').classList.remove('d-none');
  document.getElementById('contactsToAssign').classList.remove('d-none');
}