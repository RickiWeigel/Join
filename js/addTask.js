let tasks = [];
let selectedContactsToAssign = [];
let contactsSelektorOpen = false;
let taskCategories = [];
let categorySelektorOpen;
let priority;
let taskStatus;
let newSubtasks = [];
let selectedCategory = {};
let selectedColor;
let categoryColor;
let newCategoryName;
let prioritySelect;
let selectProgressStatus = "toDo";
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
  highlightedNavbar(3);
}

function changeTypInDate() {
  document.getElementById("datepicker").type = "date";
}

function openCalendar() {
  let minDate = new Date().toISOString().split("T");
  document.getElementById("datepicker").min = minDate[0];
  document.getElementById("datepicker").max = "2024-12-31";
  document.getElementById("datepicker").focus();
}

function clearBtnOnHover() {
  document.getElementById("clearBtn").src =
    "/assets/img/functionButtons/icon_cancel_blue.png";
}

function clearBtnLeaveHover() {
  document.getElementById("clearBtn").src =
    "/assets/img/functionButtons/icon_cancel.png";
}

function renderContactsToAssign() {
  let contactToAssigned = document.getElementById("contactsToAssign");
  contactToAssigned.classList.remove("d-none");
  renderContactSelectors(contactToAssigned);
  updateCheckboxStatus();
  const addTaskContent = document.getElementById("addTaskContent");
  addTaskContent.scrollTop += addTaskContent.clientHeight;
}

function renderContactSelectors(contactToAssigned) {
  if (!contactsSelektorOpen) {
    for (let i = 0; i < users[activeUser].contacts.length; i++) {
      contactToAssigned.innerHTML += `
      <div onclick="selectContactsToAssign(${i})" class="dropdown-content"><span>${users[activeUser].contacts[i].name}</span><img id="contactSelector[${i}]" src="/assets/img/functionButtons/checkButton.png"></div>
      `;
    }
    contactToAssigned.innerHTML += `
    <div onclick="toggleInviteNewContact()" class="dropdown-content"><span>Invite new contact</span><img src="/assets/img/functionButtons/contactIcon.png"></div>
    `;
    contactsSelektorOpen = true;
  } else {
    contactToAssigned.innerHTML = ``;
    contactsSelektorOpen = false;
  }
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
    renderTaskCategories();
    categorySelektorOpen = true;
  } else {
    document.getElementById("selectTaskCategory").innerHTML = ``;
    categorySelektorOpen = false;
  }
  const addTaskContent = document.getElementById("addTaskContent");
  addTaskContent.scrollTop += addTaskContent.clientHeight;
}

async function renderTaskCategories() {
  for (let i = 0; i < users[activeUser].taskCategories.length; i++) {
    const category = users[activeUser].taskCategories[i];
    const categoryHTML = categoryHTMLTemplate(category, i);
    document.getElementById("selectTaskCategory").innerHTML += categoryHTML;
  }
}

async function deleteCategory(index, event) {
  event.stopPropagation();
  // Entferne die Kategorie aus dem Array
  users[activeUser].taskCategories.splice(index, 1);
  await setItem(`users`, JSON.stringify(users));
  // Rendere die Kategorien neu
  renderCategories();
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
    category: { ...selectedCategory },
    priority: prioritySelect,
    subtasks: selectedSubtasks,
    progressStatus: selectProgressStatus,
    idCounter: 0,
  });
  await setItem(`users`, JSON.stringify(users));
  resetAllFields();
}

function toggleInviteNewContact() {
  document.getElementById("showInviteNewContact").classList.toggle("d-none");
  document.getElementById("selectContacts").classList.toggle("d-none");
  document.getElementById("contactsToAssign").classList.toggle("d-none");
}

async function addNewInviteContact() {
  let contactEmail = document.getElementById("inviteNewContact").value;
  let newInitials = getUserInitials(contactEmail);
  users[activeUser].contacts.push({
    name: contactEmail,
    email: contactEmail,
    phone: "",
    initials: newInitials,
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
  newCategoryName = document.getElementById('addNewCategory').value;
  const requiredMessage = document.getElementById("requiredCategory");
  if (!newCategoryName || !categoryColor) {
    requiredMessage.classList.remove("v-none");
    requiredMessage.innerHTML = `
      <span>${
        !newCategoryName
          ? "Please enter a category name!"
          : "Please select a category color!"
      }</span>
    `;
    return;
  }
  resetRequiredMessage();
  selectedCategory.name = newCategoryName;
  selectedCategory.color = categoryColor;
  hideNewCategory();
  users[activeUser].taskCategories.push(selectedCategory);
  await setItem(`users`, JSON.stringify(users));
  categorySelektorOpen = true;
  insertSelectedCategory();
}

function resetRequiredMessage() {
  let requiredMessage = document.getElementById("requiredCategory");
  requiredMessage.innerHTML = `
      <span>Please select a category or add a new one!</span>
    `;
  requiredMessage.classList.add("v-none");
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
  resetRequiredMessage();
  renderCategories();
}

function insertSelectedCategory() {
  document.getElementById("showCategory").innerHTML = ``;
  if (!selectedCategory || !selectedCategory.name) {
    resetCategoryRendering();
  } else {
    document.getElementById("showCategory").innerHTML = `
    <div id="currentCategory">
      <span>${selectedCategory.name}</span>
      <div class="colorCircle" style="background: ${selectedCategory.color};"></div>
    </div>
    <img src="../../assets/img/functionButtons/selectorArrow.png"> 
  `;
  }
  renderCategories();
}

function renderPrioritySelected(priority) {
  prioritySelect = priority;
  let priorityUrgent = document.getElementById("priorityUrgent");
  let priorityMedium = document.getElementById("priorityMedium");
  let priorityLow = document.getElementById("priorityLow");
  switch (prioritySelect) {
    case "Low":
      priorityUrgent.src = "../../assets/img/addTask/TaskValueHard.png";
      priorityMedium.src = "../../assets/img/addTask/TaskValueMid.png";
      priorityLow.src = "../../assets/img/addTask/TaskValueLowSelected.png";
      priorityLow.classList.remove("priorityLow");
      break;
    case "Medium":
      priorityUrgent.src = "../../assets/img/addTask/TaskValueHard.png";
      priorityMedium.src = "../../assets/img/addTask/TaskValueMidSelected.png";
      priorityLow.src = "../../assets/img/addTask/TaskValueLow.png";
      priorityMedium.classList.remove("priorityMedium");
      break;
    case "Urgent":
      priorityUrgent.src = "../../assets/img/addTask/TaskValueHardSelected.png";
      priorityMedium.src = "../../assets/img/addTask/TaskValueMid.png";
      priorityLow.src = "../../assets/img/addTask/TaskValueLow.png";
      priorityUrgent.classList.remove("priorityUrgent");
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
  if (newSubtask.length < 4) {
    document.getElementById('requiredSubtask').classList.remove('v-none')
  }else{
  newSubtasks.push(newSubtask);
  await setItem(`users`, JSON.stringify(users));
  newSubtask = document.getElementById("subtaskInput").value = "";
  clearSubtaskInput();
  renderSubtasks();
}
}

async function renderSubtasks() {
  document.getElementById("addedSubtasks").innerHTML = "";
  for (let i = newSubtasks.length - 1; i >= 0; i--) {
    document.getElementById("addedSubtasks").innerHTML += `
          <div onclick="addToSelectedSubtasks(${i})" class="subtasks">
              <img id="checkbox[${i}]" src="../../assets/img/functionButtons/checkbox.png">
              <span id="subtasks">${newSubtasks[i]}</span>
          </div>
      `;
  }
  const addTaskContent = document.getElementById("addTaskContent");
  addTaskContent.scrollTop += addTaskContent.clientHeight;
}

function categoryHover(id) {
  document.getElementById(`categoryDeleteBtn-${id}`).classList.remove("d-none");
}

function categoryLeave(id) {
  document.getElementById(`categoryDeleteBtn-${id}`).classList.add("d-none");
}

function addToSelectedSubtasks(id) {
  const checkbox = document.getElementById(`checkbox[${id}]`);
  const subtask = newSubtasks[id];
  const index = selectedSubtasks.indexOf(subtask);
  if (index > -1) {
    selectedSubtasks.splice(index, 1);
    checkbox.src = `/assets/img/functionButtons/checkbox.png`;
  } else {
    selectedSubtasks.push(subtask);
    checkbox.src = `/assets/img/functionButtons/checkboxActive.png`;
  }
}

function checkRequiredField(valueToCheck, requiredMessageId) {
  let requiredMessage = document.getElementById(requiredMessageId);

  if (
    !valueToCheck ||
    (Array.isArray(valueToCheck) && valueToCheck.length === 0)
  ) {
    requiredMessage.classList.remove("v-none");
    return true;
  }

  return false;
}

function resetCategoryRendering() {
  document.getElementById("showCategory").innerHTML = `
  <div id="currentCategory">
    <span>Select task category</span>
  </div>
  <img src="../../assets/img/functionButtons/selectorArrow.png"> 
`;
}

function resetAllFields() {
  // Setzen Sie alle globalen Variablen auf ihre ursprünglichen Werte zurück
  resetAllVariables();
  // Setzen Sie alle Eingabefelder auf ihre ursprünglichen Werte zurück
  resetAllInputs();
  // Setzen Sie alle sichtbaren Elemente auf den ursprünglichen Zustand zurück
  resetContactAssignUI();
  clearPrioritySelected();
  resetCategoryRendering();
  renderSubtasks();
}

function resetAllVariables() {
  tasks = [];
  selectedContactsToAssign = [];
  contactsSelektorOpen = false;
  taskCategories = [];
  categorySelektorOpen = false;
  priority = null;
  taskStatus = null;
  newSubtasks = [];
  selectedCategory = {};
  selectedColor = null;
  categoryColor = null;
  newCategoryName = null;
  prioritySelect = null;
  selectedSubtasks = [];
}

function resetAllInputs() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("description").value = "";
  document.getElementById("inviteNewContact").value = "";
  document.getElementById("subtaskInput").value = "";
}

function resetContactAssignUI() {
  const contactsToAssign = document.getElementById("contactsToAssign");
  const showInviteNewContact = document.getElementById("showInviteNewContact");
  const selectContacts = document.getElementById("selectContacts");
  const selectTaskCategory = document.getElementById("selectTaskCategory");
  contactsToAssign.classList.add("d-none");
  showInviteNewContact.classList.add("d-none");
  selectContacts.classList.remove("d-none");
  contactsToAssign.innerHTML = "";
  selectTaskCategory.innerHTML = "";
}

function hideRequiredFields() {
  const fieldIds = [
    "requiredTitle",
    "requiredDescription",
    "requiredDate",
    "requiredPriority",
    "requiredAssignedTo",
    "requiredCategory",
  ];
  fieldIds.forEach((fieldId) => {
    const element = document.getElementById(fieldId);
    element.classList.add("v-none");
  });
}

async function checkRequired() {
  hideRequiredFields();
  let taskTitle = document.getElementById("taskTitle").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("datepicker").value;
  const titleRequired = checkRequiredField(taskTitle, "requiredTitle");
  const descriptionRequired = checkRequiredField(description,"requiredDescription");
  const dateRequired = checkRequiredField(date, "requiredDate");
  const priorityRequired = checkRequiredField(prioritySelect,"requiredPriority");
  const assignedToRequired = checkRequiredField(selectedContactsToAssign,"requiredAssignedTo");
  const categoryRequired = checkRequiredField(selectedCategory.name,"requiredCategory");
  return (
    !titleRequired &&
    !descriptionRequired &&
    !dateRequired &&
    !priorityRequired &&
    !assignedToRequired &&
    !categoryRequired
  );
}

async function requiredAddTask() {
  const requiredFieldsValid = await checkRequired();
  if (requiredFieldsValid) {
    addTask();
  }
}
