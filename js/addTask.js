async function addTaskInit() {
  await mainInit();
  highlightedNavbar(3);
  renderPrioritySelected("Medium");
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

function openDropDownContacts(contactToAssigned) {
  for (let i = 0; i < users[activeUser].contacts.length; i++) {
    contactToAssigned.innerHTML += `
      <div onclick="selectContactsToAssign(${i}); stopClosing()" class="dropdown-content"><span>${users[activeUser].contacts[i].name}</span><img id="contactSelector[${i}]" src="/assets/img/functionButtons/checkButton.png"></div>
      `;
  }
  contactToAssigned.innerHTML += `
    <div onclick="toggleInviteNewContact()" class="dropdown-content"><span>Invite new contact</span><img src="/assets/img/functionButtons/contactIcon.png"></div>
    `;
  contactsSelektorOpen = true;
}

function closeDropDownContacts() {
  document.getElementById("contactsToAssign").innerHTML = ``;
  contactsSelektorOpen = false;
}

function closeDropdown() {
  let contactToAssigned = document.getElementById("contactsToAssign");
  closeDropDownContacts(contactToAssigned);
  closeDropDownCategories();
}

function stopClosing() {
  event.stopPropagation();
}

function updateCheckboxStatus() {
  const contactsToAssign = document.getElementById("contactsToAssign");
  const dropdownItems = contactsToAssign.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdownItems.length; i++) {
    const contactSelectorElement = document.getElementById(`contactSelector[${i}]`);
    const selectedContact = users[activeUser].contacts[i];
    const index = selectedContactsToAssign.indexOf(selectedContact);
    if (index > -1) {
      contactSelectorElement.src = "/assets/img/functionButtons/checkButtonChecked.png";
    }
  }
}

async function deleteCategory(index, event) {
  event.stopPropagation();
  users[activeUser].taskCategories.splice(index, 1);
  await setItem(`users`, JSON.stringify(users));
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
  const contactSelectorElement = document.getElementById(`contactSelector[${id}]`);
  const selectedContact = users[activeUser].contacts[id];
  const index = selectedContactsToAssign.indexOf(selectedContact);
  if (index > -1) {
    selectedContactsToAssign.splice(index, 1);
    contactSelectorElement.src = "/assets/img/functionButtons/checkButton.png";
  } else {
    selectedContactsToAssign.push(selectedContact);
    contactSelectorElement.src = "/assets/img/functionButtons/checkButtonChecked.png";
  }
  renderContactInitialsPopup(selectedContactsToAssign);
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
  addedTaskMessageSlideIn();
  forwardingOnBoard();
}

function forwardingOnBoard() {
  setTimeout(function () {
    addedTaskMessageSlideOut();
  }, 700);
  setTimeout(() => {
    window.location.href = "/board.html";
  }, 700);
}

function addedTaskMessageSlideIn() {
  document.getElementById("addedTaskMessage").classList.remove("d-none");
  document.getElementById("addedTaskMessage").classList.add("task-added-slide-in");
}

function addedTaskMessageSlideOut() {
  document.getElementById("addedTaskMessage").classList.add("d-none");
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
    id: users[activeUser].idCounter,
    name: contactEmail,
    email: contactEmail,
    phone: "",
    initials: newInitials,
    color: getRandomColor(),
  });
  users[activeUser].idCounter++;
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
  newCategoryName = document.getElementById("addNewCategory").value;
  const requiredMessage = document.getElementById("requiredCategory");
  if (!newCategoryName || !categoryColor) {
    requiredMessage.classList.remove("v-none");
    requiredMessage.innerHTML = `
      <span>${!newCategoryName ? "Please enter a category name!" : "Please select a category color!"}</span>
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
      ${showCurrentCategory(selectedCategory)}
  `;
  }
  renderCategories();
}

function clearPrioritySelected() {
  document.getElementById("priorityUrgent").src = "../../assets/img/addTask/TaskValueHard.png";
  document.getElementById("priorityMedium").src = "../../assets/img/addTask/TaskValueMid.png";
  document.getElementById("priorityLow").src = "../../assets/img/addTask/TaskValueLow.png";
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
    ${resetSubtaskActiveInput()}
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
    document.getElementById("requiredSubtask").classList.remove("v-none");
  } else {
    newSubtasks.push(newSubtask);
    selectedSubtasks.push(newSubtask);
    await setItem(`users`, JSON.stringify(users));
    newSubtask = document.getElementById("subtaskInput").value = "";
    clearSubtaskInput();
    await renderSubtasks();
  }
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

