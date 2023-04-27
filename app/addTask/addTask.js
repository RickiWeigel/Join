let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let contactSelector;
let categories = [];
let subTask;
let taskId = tasks.length;
let priority;
let assignedTo = selectedContactsToAssign;
let taskStatus;
let taskInputTitle = document.getElementById("taskTitle");
let date = document.getElementById("datepicker");
let description = document.getElementById("description");

async function addTaskInit() {
  mainInit();
  // loadUsers();
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
  if (contactsSelektorOpen === false) {
    for (let i = 0; i < users[activeUser].contacts.length; i++) {
      document.getElementById("contactsToAssign").innerHTML += `
      <div onclick="contactCheckbox(${i})" class="singleContact"><span>${contacts[i]}</span><img id="contactSelector[${i}]"  src="/assets/img/functionButtons/checkButton.png"></div>
      `;
    }
    document.getElementById("contactsToAssign").innerHTML += `
    <div class="singleContact"><span>Invite new contact</span><img src="/assets/img/functionButtons/contactIcon.png"></div>
    `;
    contactsSelektorOpen = true;
  } else {
    document.getElementById("contactsToAssign").innerHTML = ``;
    contactsSelektorOpen = false;
  }
}

function contactCheckbox(id) {
  if (contactSelector) {
    document.getElementById(`contactSelector[${id}]`).src =
      "/assets/img/functionButtons/checkButton.png";
    //entfernt aktivierten Kontakt
    let index = selectedContactsToAssign.indexOf(contacts[id]);
    if (index > -1) {
      selectedContactsToAssign.splice(index, 1);
    }
    contactSelector = false;
  } else {
    //fügt aktivierten Kontakt hinzu
    selectedContactsToAssign.push(contacts[id]);
    document.getElementById(`contactSelector[${id}]`).src =
      "/assets/img/functionButtons/checkButtonChecked.png";
    contactSelector = true;
  }
}

async function addTask() {
    users[activeUser].userTasks.push({
    taskTitle: taskInputTitle.value,
    taskDescription: description.value,
    toDueDate: date.value,
    taskID: taskId,
  });
  await setItem(`users[${activeUser}].userTasks`, JSON.stringify(tasks));
  resetInput();
}

function resetInput() {
  taskInputTitle = document.getElementById("taskTitle").value='';
  date = document.getElementById("datepicker").value='';
  description = document.getElementById("description").value='';
}


function renderCategories() {
    for (let i = 0; i < users[activeUser].userTasks.length; i++) {
      document.getElementById("contactsToAssign").innerHTML += `
      <div onclick="contactCheckbox(${i})" class="singleContact"><span>${categories[i]}</span></div>
      `;
    }
}

