let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let taskCategories = [];
let categorySelektorOpen;
let priority;
let taskStatus;
let selectedCategory = {};
let selectedColor;
let categoryColor;
let newCategoryName;
let prioritySelect;
let selectedSubtasks = [];
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
  await mainInit();
  renderSubtasks();
  highlightedNavbar(3);
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
  document.getElementById("contactsToAssign").classList.remove("d-none");
  if (!contactsSelektorOpen) {
    for (let i = 0; i < users[activeUser].contacts.length; i++) {
      document.getElementById("contactsToAssign").innerHTML += `
      <div onclick="selectContactsToAssign(${i})" class="dropdown-content"><span>${users[activeUser].contacts[i].name}</span><img id="contactSelector[${i}]" src="/assets/img/functionButtons/checkButton.png"></div>
      `;
    }
    document.getElementById("contactsToAssign").innerHTML += `
    <div onclick="toggleInviteNewContact()" class="dropdown-content"><span>Invite new contact</span><img src="/assets/img/functionButtons/contactIcon.png"></div>
    `;
    contactsSelektorOpen = true;
  } else {
    document.getElementById("contactsToAssign").innerHTML = ``;
    contactsSelektorOpen = false;
  }
  updateCheckboxStatus();
}

function updateCheckboxStatus() {
  const contactsToAssign = document.getElementById("contactsToAssign");
  const dropdownItems =
    contactsToAssign.getElementsByClassName("dropdown-content");

  for (let i = 0; i < dropdownItems.length; i++) {
    const contactSelectorElement = document.getElementById(
      `contactSelector[${i}]`
    );
    const selectedContact = users[activeUser].contacts[i];
    const index = selectedContactsToAssign.indexOf(selectedContact);
    if (index > -1) {
      contactSelectorElement.src =
        "/assets/img/functionButtons/checkButtonChecked.png";
      }
  }
}

function renderCategories() {
  if (!categorySelektorOpen) {
    document.getElementById("selectTaskCategory").innerHTML = `
      <div onclick="showNewCategory()" class="dropdown-content"><span>New category</span></div>
  `;
    for (let i = 0; i < users[activeUser].taskCategories.length; i++) {
      document.getElementById("selectTaskCategory").innerHTML += `
        <div onclick="setSelectedCategory('${i}')" class="dropdown-content">
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

function setSelectedCategory(id) {
  selectedCategory = {
    color: users[activeUser].taskCategories[id].color,
    name: users[activeUser].taskCategories[id].name,
  };
  insertSelectedCategory();
}

function selectContactsToAssign(id) {
  const contactSelectorElement = document.getElementById(
    `contactSelector[${id}]`
  );
  const selectedContact = users[activeUser].contacts[id];
  const index = selectedContactsToAssign.indexOf(selectedContact);

  if (index > -1) {
    selectedContactsToAssign.splice(index, 1);
    contactSelectorElement.src = "/assets/img/functionButtons/checkButton.png";
  } else {
    selectedContactsToAssign.push(selectedContact);
    contactSelectorElement.src =
      "/assets/img/functionButtons/checkButtonChecked.png";
  }
}

async function addTask() {
  let taskInputTitle = document.getElementById("taskTitle");
  let date = document.getElementById("datepicker");
  let description = document.getElementById("description");
  users[activeUser].userTasks.push({
    taskTitle: taskInputTitle.value,
    completedTasks: [],
    taskDescription: description.value,
    toDueDate: date.value,
    taskID: users[activeUser].userTasks.length,
    assignedTo: selectedContactsToAssign,
    category: {
      name: selectedCategory.name,
      color: selectedCategory.color,
    },
    priority: prioritySelect,
    subtasks: selectedSubtasks,
    progressStatus: "toDo",
  });
  await setItem(`users`, JSON.stringify(users));
  resetInput();
}

function resetInput() {
  window.location.href = "/app/board/board.html";
  // taskInputTitle = document.getElementById("taskTitle").value = "";
  // date = document.getElementById("datepicker").value = "";
  // description = document.getElementById("description").value = "";
  // renderShowCategory();
  // selectedContactsToAssign = [];
  // clearPrioritySelected();
  // selectedSubtasks = [];
}

function toggleInviteNewContact() {
  document.getElementById("showInviteNewContact").classList.toggle("d-none");
  document.getElementById("selectContacts").classList.toggle("d-none");
  document.getElementById("contactsToAssign").classList.toggle("d-none");
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
  toggleInviteNewContact();
  renderContactsToAssign();
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

async function addNewCategoryFunction() {
  selectedCategory.name = newCategoryName;
  selectedCategory.color = categoryColor;
  hideNewCategory();
  users[activeUser].taskCategories.push(selectedCategory);
  await setItem(`users`, JSON.stringify(users));
  categorySelektorOpen = true;
  insertSelectedCategory();
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

function insertSelectedCategory() {
  document.getElementById("showCategory").innerHTML = `
    <div id="currentCategory">
      <span>${selectedCategory.name}</span>
      <div class="colorCircle" style="background: ${selectedCategory.color};"></div>
    </div>
    <img src="../../assets/img/functionButtons/selectorArrow.png"> 
  `;
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

function clearPrioritySelected() {
  document.getElementById("priorityUrgent").src =
    "../../assets/img/addTask/TaskValueHard.png";
  document.getElementById("priorityMedium").src =
    "../../assets/img/addTask/TaskValueMid.png";
  document.getElementById("priorityLow").src =
    "../../assets/img/addTask/TaskValueLow.png";
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
    <img onclick="addNewSubTasks()" src="/assets/img/functionButtons/checkedIconSelector.png">
  `;
}

function clearSubtaskInput() {
  document.getElementById("subtaskInput").value = "";
  document.getElementById("subtaskButtons").innerHTML = `
    <img src="../../assets/img/functionButtons/add.png">
  `;
}

async function addNewSubTasks() {
  let newSubtask = document.getElementById("subtaskInput").value;
  users[activeUser].subtasks.push(newSubtask);
  deleteSubtasks();
  await setItem(`users`, JSON.stringify(users));
  newSubtask = document.getElementById("subtaskInput").value = "";
  clearSubtaskInput();
  renderSubtasks();
}

function deleteSubtasks() {
  if (users[activeUser].subtasks.length > 6) {
    users[activeUser].subtasks.shift();
  }
}

async function renderSubtasks() {
  document.getElementById("addedSubtasks").innerHTML = "";
  for (let i = users[activeUser].subtasks.length - 1; i >= 0; i--) {
    document.getElementById("addedSubtasks").innerHTML += `
        <div onclick="addToSelectedSubtasks(${i})" class="subtasks">
          <img id=checkbox[${i}] src="../../assets/img/functionButtons/checkbox.png">
          <span id="subtasks">${users[activeUser].subtasks[i]}</span>
        </div>
      `;
  }
}

function addToSelectedSubtasks(id) {
  const checkbox = document.getElementById(`checkbox[${id}]`);
  const subtask = users[activeUser].subtasks[id];
  const index = selectedSubtasks.indexOf(subtask);
  if (index > -1) {
    selectedSubtasks.splice(index, 1);
    checkbox.src = `/assets/img/functionButtons/checkbox.png`;
  } else {
    selectedSubtasks.push(subtask);
    checkbox.src = `/assets/img/functionButtons/checkboxActive.png`;
  }
}

// function toggleSubtasks(index, checkbox){
//   if (index > -1) {
//     selectedSubtasks.splice(index, 1);
//     checkbox.src = `/assets/img/functionButtons/checkbox.png`;
//   } else {
//     selectedSubtasks.push(subtask);
//     checkbox.src = `/assets/img/functionButtons/checkboxActive.png`;
//   }
// }

