let tasks = [];
let selectedContactsToAssign = [];
let selectedcategories=[];
let contactsSelektorOpen = false;
let loginCheckedBox;
let title = document.getElementById('taskTitle');
let description = document.getElementById('description');
let date = document.getElementById('datepicker');
let category;
let subTask;
let taskId = tasks.length;
let priority;
let assignedTo = selectedContactsToAssign;
let taskStatus;



async function addTaskInit() {
  mainInit();
  loadUsers();  
  getActiveUserLocal();
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
      <div onclick="loginCheckbox(${i})" class="singleContact"><span>${contacts[i]}</span><img id="contactSelector[${i}]"  src="/assets/img/functionButtons/checkButton.png"></div>
      `;
    }
    document.getElementById("contactsToAssign").innerHTML +=`
    <div class="singleContact"><span>Invite new contact</span><img src="/assets/img/functionButtons/contactIcon.png"></div>
    `;
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

async function addTask() {
  tasks.push({
      taskTitle: title.value,
      taskDescription: description.value,
      toDueDate: date.value,
      taskID: taskId,


  });
  await setItem('tasks', JSON.stringify(tasks));
}