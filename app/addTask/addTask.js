let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let contactSelector;
let taskCategories = [];
let categorySelektorOpen;
let priority;
let taskStatus;
let selectedCategory;
let selectedColor;
let categoryColor;
let newCategoryName;
let newCategory = {};
let prioritySelect;
const colorActions = {
  lightblue: () => {
    selectedColor = "#8AA4FF";
    categoryColor = selectedColor;
  },
  red: () => {
    selectedColor = "#FF0000";
    categoryColor = selectedColor;
  },
  green: () => {
    selectedColor = "#2AD300";
    categoryColor = selectedColor;
  },
  orange: () => {
    selectedColor = "#FF8A00";
    categoryColor = selectedColor;
  },
  pink: () => {
    selectedColor = "#E200BE";
    categoryColor = selectedColor;
  },
  blue: () => {
    selectedColor = "#0038FF";
    categoryColor = selectedColor;
  },
};

async function addTaskInit() {
  mainInit();
  renderSubtasks();
}

// Show Date (jquery)
$(function () {
  $("#datepicker").datepicker({
    inline: true,
    changeMonth: true,
    changeYear: true,
  });
});

function clearBtnOnHover() {
  document.getElementById("clearBtn").src =
    "/assets/img/functionButtons/icon_cancel_blue.png";
}

function clearBtnLeaveHover() {
  document.getElementById("clearBtn").src =
    "/assets/img/functionButtons/icon_cancel.png";
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
 
    <div onclick="setSelectedCategory('${users[activeUser].taskCategories[i].name}')" class="dropdown-content">
      <span>${users[activeUser].taskCategories[i].name}</span>
      <div class="colorCircle" style="background: ${users[activeUser].taskCategories[i].color};"></div>
    </div>
    
   
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
    category: {
      name: newCategory.name,
      color: newCategory.color,
    },
    priority: prioritySelect,
  });
  users[activeUser].taskCategories.push(newCategory);
  resetInput();
  await setItem(`users`, JSON.stringify(users));
}

function resetInput() {
  taskInputTitle = document.getElementById("taskTitle").value = "";
  date = document.getElementById("datepicker").value = "";
  description = document.getElementById("description").value = "";
  renderShowCategory();
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
  renderContactsToAssign();
}

async function addNewInviteContact() {
  let contactEmail = document.getElementById("inviteNewContact").value;
  users[activeUser].contacts.push({
    name: contactEmail,
    email: "contactEmail",
    phone: "",
    initials: "",
    color: getRandomColor(),
  });
  await setItem(`users`, JSON.stringify(users));
  document.getElementById("inviteNewContact").value = "";
  hideInviteNewContact();
  renderContactsToAssign();
}

function setSelectedCategory(value) {
  selectedCategory = value;
}

function addNewCategoryName() {
  newCategoryName = document.getElementById("addNewCategory").value;
}

function addCategoryColor(color) {
  addNewCategoryName();
  colorActions[color]();
  document.getElementById("lightblue").classList.remove("colorCircleActive");
  document.getElementById("red").classList.remove("colorCircleActive");
  document.getElementById("green").classList.remove("colorCircleActive");
  document.getElementById("orange").classList.remove("colorCircleActive");
  document.getElementById("pink").classList.remove("colorCircleActive");
  document.getElementById("blue").classList.remove("colorCircleActive");
  document.getElementById(color).classList.add("colorCircleActive");
}

function addNewCategoryFunction() {
  newCategory.name = newCategoryName;
  newCategory.color = categoryColor;
  hideNewCategory();
  document.getElementById("showCategory").innerHTML = `
    <div id="currentCategory">
      <span>${newCategory.name}</span>
      <div id="circle" class="colorCircle"></div>
    </div>
    <img src="../../assets/img/functionButtons/selectorArrow.png">
  `;
  document.getElementById("circle").style.backgroundColor = newCategory.color;
}

function renderShowCategory() {
  document.getElementById("showCategory").innerHTML = `
    <div id="currentCategory"><span>Select task category</span></div>
    <img src="../../assets/img/functionButtons/selectorArrow.png"> 
  `;
}

function showNewCategory() {
  document.getElementById("showNewCategory").classList.remove("d-none");
  document.getElementById("colorCircle").classList.remove("d-none");
  document.getElementById("showCategory").classList.add("d-none");
  document.getElementById("selectTaskCategory").classList.add("d-none");
}

function hideNewCategory() {
  document.getElementById("showNewCategory").classList.add("d-none");
  document.getElementById("colorCircle").classList.add("d-none");
  document.getElementById("showCategory").classList.remove("d-none");
  document.getElementById("selectTaskCategory").classList.remove("d-none");
  renderCategories();
}

function renderPrioritySelected(priority) {
  prioritySelect = priority;
  switch (prioritySelect) {
    case "Low":
      document.getElementById("priorityUrgent").src =
        "../../assets/img/addTask/TaskValueHard.png";
      document.getElementById("priorityMedium").src =
        "../../assets/img/addTask/TaskValueMid.png";
      document.getElementById("priorityLow").src =
        "../../assets/img/addTask/TaskValueLowSelected.png";
      document.getElementById("priorityLow").classList.remove("priorityLow");
      break;
    case "Medium":
      document.getElementById("priorityUrgent").src =
        "../../assets/img/addTask/TaskValueHard.png";
      document.getElementById("priorityMedium").src =
        "../../assets/img/addTask/TaskValueMidSelected.png";
      document.getElementById("priorityLow").src =
        "../../assets/img/addTask/TaskValueLow.png";
      document
        .getElementById("priorityMedium")
        .classList.remove("priorityMedium");
      break;
    case "Urgent":
      document.getElementById("priorityUrgent").src =
        "../../assets/img/addTask/TaskValueHardSelected.png";
      document.getElementById("priorityMedium").src =
        "../../assets/img/addTask/TaskValueMid.png";
      document.getElementById("priorityLow").src =
        "../../assets/img/addTask/TaskValueLow.png";
      document
        .getElementById("priorityUrgent")
        .classList.remove("priorityUrgent");
      break;
  }
}

function priorityMouseHover(overBorder) {
  switch (overBorder) {
    case "red":
      addClassesPriorties();
      break;
    case "orange":
      addClassesPriorties();
      break;
    case "green":
      addClassesPriorties();
      break;
  }
}

function addClassesPriorties() {
  document.getElementById("priorityUrgent").classList.add("priorityUrgent");
  document.getElementById("priorityMedium").classList.add("priorityMedium");
  document.getElementById("priorityLow").classList.add("priorityLow");
}

function priorityMouseLeave(id) {
  document.getElementById(id).classList.remove(id);
}

function subtaskActiveInput() {
  document.getElementById("subtaskButtons").innerHTML = `
    <img onclick="clearSubtaskInput()"
      src="/assets/img/functionButtons/cancelBlue.png">
    <img style="padding-left: 8px; padding-right: 8px;"
      src="/assets/img/functionButtons/trennstrich.png">
    <img onclick="addSubTasks()" src="/assets/img/functionButtons/checkedIconSelector.png">
  `;
}

function clearSubtaskInput() {
  document.getElementById("subtaskInput").value = "";
  document.getElementById("subtaskButtons").innerHTML = `
    <img src="../../assets/img/functionButtons/add.png">
  `;
}

async function addSubTasks() {
  let newSubtask = document.getElementById("subtaskInput").value;
  users[activeUser].subtasks.push(newSubtask);
  deleteSubtasks();
  await setItem(`users`, JSON.stringify(users));
  newSubtask = document.getElementById("subtaskInput").value = "";
  renderSubtasks();
}

function deleteSubtasks(){
  if (users[activeUser].subtasks.length > 4){
    users[activeUser].subtasks.shift();
  }
}


async function renderSubtasks() {
  setTimeout(() => {
    document.getElementById("addedSubtasks").innerHTML = "";
    for (let i = users[activeUser].subtasks.length - 1; i >= 0; i--) {
      document.getElementById("addedSubtasks").innerHTML += `
        <div class="subtasks">
          <img src="../../assets/img/functionButtons/checkbox.png">
          <span id="subtasks">${users[activeUser].subtasks[i]}</span>
        </div>
      `;
    }
  }, 400);
}
