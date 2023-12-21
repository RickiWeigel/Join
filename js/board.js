let currentSubtasks = [];
let currentDraggedElement;
let hidePopupStatus;
let statusVariables = [toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks];

async function boardInit() {
  await mainInit();
  highlightedNavbar(2);
  groupTasksByProgressStatus(users[activeUser]);
  checkEmptyTasks();
}

function groupTasksByProgressStatus(user) {
  toDoTasks = 0;
  inProgressTasks = 0;
  awaitFeedbackTasks = 0;
  doneTasks = 0;
  statusVariables = [toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks];
  resetTaskContainers();
  let userTasks = user.userTasks;
  for (let i = 0; i < userTasks.length; i++) {
    let task = userTasks[i];
    sortProgress(task, i);
  }
}

function searchTasks() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let taskCards = document.getElementsByClassName("taskCard");
  for (let i = 0; i < taskCards.length; i++) {
    let taskTitle = taskCards[i].getElementsByClassName("taskHeadline")[0].innerText.toLowerCase();
    if (startsWithLetters(taskTitle, searchInput)) {
      taskCards[i].style.display = "block";
    } else {
      taskCards[i].style.display = "none";
    }
  }
}

function doNotCloseOverlay(event) {
  event.stopPropagation();
}

function openDragMenu(el) {
  let dragMenu = el.closest(".taskCard").querySelectorAll(".dragMenu");

  for (let i = 0; i < dragMenu.length; i++) {
    if (dragMenu[i].style.display === "none") {
      closeAllDragMenu();
      dragMenu[i].style.display = "flex";
    } else {
      dragMenu[i].style.display = "none";
    }
  }
  isSameStatus(el);
}

function isSameStatus(el) {
  let status = el.closest(".processSection").querySelectorAll(".status-responsiv");
  let currentStatus = el.closest(".singleCategory").querySelector(".singleCategoryHeader div");

  for (let i = 0; i < status.length; i++) {
    if (currentStatus.innerHTML == status[i].innerHTML) {
      status[i].style.opacity = "0.3";
      status[i].style.pointerEvents = "none";
    }
  }
}

function closeAllDragMenu() {
  let dragMenu = document.querySelectorAll(".dragMenu");

  for (let i = 0; i < dragMenu.length; i++) {
    dragMenu[i].style.display = "none";
  }
}

function startsWithLetters(taskTitle, searchInput) {
  let taskWords = taskTitle.toLowerCase().split(" ");
  for (let i = 0; i < searchInput.length; i++) {
    let char = searchInput[i];
    if (!taskWords.some((word) => word[i] === char)) {
      return false;
    }
  }
  return true;
}

function sortProgress(task, id) {
  switch (task.progressStatus) {
    case "toDo":
      toDoTasks++;
      renderTaskCardForStatus("toDoTasks", id);
      break;
    case "inProgress":
      inProgressTasks++;
      renderTaskCardForStatus("inProgressTasks", id);
      break;
    case "awaitFeedback":
      awaitFeedbackTasks++;
      renderTaskCardForStatus("awaitFeedbackTasks", id);
      break;
    case "done":
      doneTasks++;
      renderTaskCardForStatus("doneTasks", id);
      break;
  }
  statusVariables = [toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks];
}

function checkEmptyTasks() {
  for (let i = 0; i < statusVariables.length; i++) {
    if (statusVariables[i] == 0) {
      renderNoTasks(getStatusCardId(i));
    }
  }
}

function getStatusCardId(index) {
  var statusCardIds = ["toDoTasks", "inProgressTasks", "awaitFeedbackTasks", "doneTasks"];
  return statusCardIds[index];
}

function renderNoTasks(StatusCardId) {
  document.getElementById(StatusCardId).innerHTML = `
    <div class="noTasks"><span>no tasks available</span></div>
  `;
}

async function renderTaskCardForStatus(taskStatus, id) {
  let userTask = users[activeUser].userTasks[id];
  let completedTasks = userTask.completedTasks.length;
  let subtaskLength = userTask.subtasks.length;
  let completedProgress = completedProgresses(completedTasks, subtaskLength);
  let priorityImageUrl = getPriorityImageUrl(userTask.priority);
  document.getElementById(taskStatus).innerHTML += `
    ${renderTaskCardForStatusTemplate(userTask, completedTasks, subtaskLength, completedProgress, priorityImageUrl, id)}
  `;
  hideProgressStatusIfNoSubtasks(id);
  renderContactInitials(id);
}

function hideProgressStatusIfNoSubtasks(id) {
  const progressStatusElement = document.getElementById(`progressStatus${id}`);
  if (!progressStatusElement) {
    progressStatusElement.style.display = "none";
  }
}

function completedProgresses(completedTasks, subtaskLength) {
  let progress = (completedTasks / subtaskLength) * 100;
  return progress;
}

function renderContactInitials(id) {
  const taskContact = document.getElementById(`taskContacts${id}`);
  const userContact = users[activeUser].userTasks[id].assignedTo;
  taskContact.innerHTML = "";
  for (let j = 0; j < Math.min(userContact.length, 2); j++) {
    const newColor = userContact[j].color;
    taskContact.innerHTML += `
      <div class="contact box${j}" style="background-color: ${newColor};">
        <span id="contactInitials">${userContact[j].initials}</span>
      </div>`;
  }
  if (userContact.length > 2) {
    taskContact.innerHTML += `
      <div class="contact boxRest">
        <span id="contactInitials">+${userContact.length - 2}</span>
      </div>`;
  }
}

function resetTaskContainers() {
  document.getElementById("toDoTasks").innerHTML = "";
  document.getElementById("inProgressTasks").innerHTML = "";
  document.getElementById("awaitFeedbackTasks").innerHTML = "";
  document.getElementById("doneTasks").innerHTML = "";
}

function getPriorityImageUrl(priority) {
  if (priority == "Low") {
    return "/assets/img/board/iconLow.png";
  } else if (priority == "Medium") {
    return "/assets/img/board/iconMid.png";
  } else if (priority == "Urgent") {
    return "/assets/img/board/iconHard.png";
  }
}

function hideSubtaskHeadlineIfZeroSubtasks(userTask) {
  let subtaskLength = userTask.subtasks.length;
  if (subtaskLength == 0) {
    document.getElementById("subHeading").classList.add("d-none");
  }
}

function hideRequiredFieldsEdit() {
  const fieldIds = ["requiredTitle", "requiredDescription", "requiredDate"];
  fieldIds.forEach((fieldId) => {
    const element = document.getElementById(fieldId);
    element.classList.add("v-none");
  });
}

async function checkRequiredEdit(id) {
  hideRequiredFieldsEdit();
  let taskTitle = document.getElementById("taskTitleEdit").value;
  let description = document.getElementById("descriptionEdit").value;
  let date = document.getElementById("datepicker").value;
  const titleRequired = checkRequiredField(taskTitle, "requiredTitle");
  const descriptionRequired = checkRequiredField(description, "requiredDescription");
  const dateRequired = checkRequiredField(date, "requiredDate");
  if (!titleRequired && !descriptionRequired && !dateRequired) {
    editTask(users[activeUser].userTasks[id], id);
  }
}

function retainDateValue(input) {
  const dateValue = input.value;
  if (dateValue) {
    const isValidDate = /^(\d{4})-(\d{2})-(\d{2})$/.test(dateValue);
    if (isValidDate) {
      input.type = "date";
    } else {
      input.value = dateValue;
    }
  } else {
    input.type = "text";
  }
}

function btnHover(imgID) {
  let button = document.getElementById(imgID);
  if (imgID == "deleteButton") {
    button.src = "../../assets/img/functionButtons/deleteHover.png";
  } else {
    button.src = "../../assets/img/functionButtons/editHover.png";
  }
}

function btnLeave(imgID) {
  let button = document.getElementById(imgID);
  if (imgID == "deleteButton") {
    button.src = "../../assets/img/functionButtons/delete.png";
  } else {
    button.src = "../../assets/img/functionButtons/edit.png";
  }
}

function closeHover() {
  let button = document.getElementById("closeBtn");
  button.src = "../../assets/img/functionButtons/closeHover.png";
}

function closeLeave() {
  let button = document.getElementById("closeBtn");
  button.src = "../../assets/img/functionButtons/close.png";
}

function renderCategoriesEdit() {
  if (!categorySelektorOpen) {
    document.getElementById("selectTaskCategory").innerHTML = `
      <div onclick="showNewCategory()" class="dropdown-content"><span>New category</span></div>
  `;
    for (let i = 0; i < users[activeUser].taskCategories.length; i++) {
      renderCategoriesEditDropdown();
    }
    categorySelektorOpen = true;
  } else {
    document.getElementById("selectTaskCategory").innerHTML = ``;
    categorySelektorOpen = false;
  }
}

function renderCategoriesEditDropdown() {
  userTaskCategory = users[activeUser].taskCategories[i];
  document.getElementById("selectTaskCategory").innerHTML += `
  <div onclick="setSelectedCategoryEdit('${i}')" class="dropdown-content">
    <div class="dropdown-content-left">
      <span>${userTaskCategory.name}</span>
      <div class="colorCircle" style="background: ${userTaskCategory.color};"></div>
    </div> 
    <img class="delete-btn" id="deleteBtn-${i}" src="../../assets/img/functionButtons/delete.png">
  </div>
`;
}

function setSelectedCategoryEdit(id) {
  selectedCategory = {
    color: users[activeUser].taskCategories[id].color,
    name: users[activeUser].taskCategories[id].name,
  };
  insertSelectedCategory();
}

async function renderSubtasksTaskEdit(id) {
  document.getElementById("popupSubtasksEdit").innerHTML = "";
  for (let i = 0; i < users[activeUser].userTasks[id].subtasks.length; i++) {
    document.getElementById("popupSubtasksEdit").innerHTML += `
    <div class="dropDownContentEdit" onclick="" onmouseover="subtaskEditHover(${i})" onmouseleave="subtaskEditLeave(${i})">
      <div class="dropdown-content-left">
        <img id='checkboxEdit[${i}]' src="../../assets/img/functionButtons/checkbox.png">
        <span>${users[activeUser].userTasks[id].subtasks[i]}</span>
      </div>
      <img onclick="subtaskDeleteEdit(${id},${i})" id="deleteBtn-${i}" class="delete-btn d-none" src="../../assets/img/functionButtons/delete.png">
    </div>
    `;
  }
  await updateCheckboxStatusSubtasksEdit(id);
}

function subtaskEditHover(id) {
  document.getElementById(`deleteBtn-${id}`).classList.remove("d-none");
}

function subtaskEditLeave(id) {
  document.getElementById(`deleteBtn-${id}`).classList.add("d-none");
}

function subtaskDeleteEdit(id, i) {
  let currentSubtask = users[activeUser].userTasks[id].subtasks;
  const deletedSubtask = currentSubtask.splice(i, 1)[0];
  const completedTasks = users[activeUser].userTasks[id].completedTasks;
  for (let j = 0; j < completedTasks.length; j++) {
    if (completedTasks[j] === deletedSubtask) {
      completedTasks.splice(j, 1);
      break;
    }
  }
  renderSubtasksTaskEdit(id);
}

async function updateCheckboxStatusSubtasksEdit(id) {
  const selectedTasks = users[activeUser].userTasks[id].subtasks;
  const subtasks = users[activeUser].userTasks[id].subtasks;
  for (let i = 0; i < subtasks.length; i++) {
    const checkbox = document.getElementById(`checkboxEdit[${i}]`);
    if (selectedTasks.includes(subtasks[i])) {
      checkbox.src = `../../assets/img/functionButtons/checkboxActive.png`;
    } else {
      checkbox.src = `../../assets/img/functionButtons/checkbox.png`;
    }
  }
}

function subtaskActiveInputEdit(id) {
  document.getElementById("subtaskButtons").innerHTML = `
    <img onclick="clearSubtaskInput()"
      src="/assets/img/functionButtons/cancelBlue.png">
    <img style="padding-left: 8px; padding-right: 8px;"
      src="/assets/img/functionButtons/trennstrich.png">
    <img onclick="addNewSubTasksOnEdit(${id})" src="/assets/img/functionButtons/checkedIconSelector.png">
  `;
}

async function addNewSubTasksOnEdit(id) {
  let newSubtask = document.getElementById("subtaskInput").value;
  if (newSubtask.length < 4) {
    document.getElementById("requiredSubtask").classList.remove("v-none");
  } else {
    users[activeUser].userTasks[id].subtasks.push(newSubtask);
    await setItem(`users`, JSON.stringify(users));
    newSubtask = document.getElementById("subtaskInput").value = "";
    clearSubtaskInput();
    await renderSubtasksTaskEdit(id);
  }
}

async function editTask(userTask, id) {
  await editTaskTitle(userTask);
  userTask.taskDescription = document.getElementById("descriptionEdit").value;
  userTask.toDueDate = document.getElementById("datepicker").value;
  userTask.priority = prioritySelect;
  setUserTaskCategoryEdit(userTask);
  await setItem(`users`, JSON.stringify(users));
  hidePopup();
  openPopupTask(id);
}

function setUserTaskCategoryEdit(userTask) {
  if (selectedCategory.name != 0) {
    userTask.category.color = selectedCategory.color;
    userTask.category.name = selectedCategory.name;
  } else {
    userTask.category.color = userTask.category.color;
    userTask.category.name = userTask.category.name;
  }
}

async function editTaskTitle(userTask) {
  let userTaskTitle = userTask.taskTitle;
  let currentInput = document.getElementById("taskTitleEdit").value;
  if (currentInput != userTaskTitle) {
    userTask.taskTitle = currentInput;
  }
}

async function renderSubtasksTask(id) {
  document.getElementById("popupSubtasks").innerHTML = "";
  for (let i = 0; i < users[activeUser].userTasks[id].subtasks.length; i++) {
    document.getElementById("popupSubtasks").innerHTML += `
    <div class="subtask" onclick="addToSelectedSubtasksBoard(${id}, ${i})">
      <img id='checkbox[${i}]' src="../../assets/img/functionButtons/checkbox.png">
      <span>${users[activeUser].userTasks[id].subtasks[i]}</span>
    </div>
    `;
  }
  updateCheckboxStatusTask(id);
}

async function addToSelectedSubtasksBoard(id, i) {
  const completedTasks = users[activeUser].userTasks[id].completedTasks;
  const subtask = users[activeUser].userTasks[id].subtasks[i];
  if (completedTasks.includes(subtask)) {
    const index = completedTasks.indexOf(subtask);
    completedTasks.splice(index, 1);
    const checkbox = document.getElementById(`checkbox[${i}]`);
    checkbox.src = `../../assets/img/functionButtons/checkbox.png`;
  } else {
    completedTasks.push(subtask);
    const checkbox = document.getElementById(`checkbox[${i}]`);
    checkbox.src = `../../assets/img/functionButtons/checkboxActive.png`;
  }
  await setItem(`users`, JSON.stringify(users));
}

function updateCheckboxStatusTask(id) {
  const completedTasks = users[activeUser].userTasks[id].completedTasks;
  const subtasks = users[activeUser].userTasks[id].subtasks;
  for (let i = 0; i < subtasks.length; i++) {
    const checkbox = document.getElementById(`checkbox[${i}]`);
    if (completedTasks.includes(subtasks[i])) {
      checkbox.src = `../../assets/img/functionButtons/checkboxActive.png`;
    } else {
      checkbox.src = `../../assets/img/functionButtons/checkbox.png`;
    }
  }
}

async function deleteCurrentTask(id) {
  hidePopup();
  users[activeUser].userTasks.splice(id, 1);
  await setItem(`users`, JSON.stringify(users));
  groupTasksByProgressStatus(users[activeUser]);
}

function renderContactsToAssignEdit(id) {
  document.getElementById("contactsToAssign").classList.remove("d-none");
  if (!contactsSelektorOpen) {
    for (let i = 0; i < users[activeUser].contacts.length; i++) {
      document.getElementById("contactsToAssign").innerHTML += `
      <div onclick="selectContactsToAssignEdit(${id},${i})" class="dropdown-content"><span>${users[activeUser].contacts[i].name}</span><img id="contactSelector[${i}]" src="/assets/img/functionButtons/checkButton.png"></div>
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
  updateCheckboxStatusAssignedTo(id);
}

function updateCheckboxStatusAssignedTo(id) {
  const contacts = users[activeUser].contacts;
  const assignedTo = users[activeUser].userTasks[id].assignedTo;

  contacts.forEach((contact, i) => {
    const isAssigned = assignedTo.some((assigned) => contact.email === assigned.email);
    const contactSelector = document.getElementById(`contactSelector[${i}]`);

    if (contactSelector) {
      contactSelector.src = isAssigned ? "/assets/img/functionButtons/checkButtonChecked.png" : "/assets/img/functionButtons/checkButton.png";
    }
  });
}

async function selectContactsToAssignEdit(id, currentContactId) {
  const { email } = users[activeUser].contacts[currentContactId];
  const contactAssignedTo = users[activeUser].userTasks[id].assignedTo;
  const isContactAssigned = contactAssignedTo.some((contact) => contact.email === email);
  if (isContactAssigned) {
    contactAssignedTo.splice(currentContactId, 1);
  } else {
    contactAssignedTo.push(users[activeUser].contacts[currentContactId]);
  }
  await setItem(`users`, JSON.stringify(users));
  document.getElementById("contactsToAssign").innerHTML = ``;
  contactsSelektorOpen = false;
  renderContactsToAssignEdit(id);
}

function subtaskActiveInputBoard() {
  document.getElementById("subtaskButtons").innerHTML = `
    <img onclick="clearSubtaskInput()"
      src="/assets/img/functionButtons/cancelBlue.png">
    <img style="padding-left: 8px; padding-right: 8px;"
      src="/assets/img/functionButtons/trennstrich.png">
    <img onclick="addNewSubTasksBoard()" src="/assets/img/functionButtons/checkedIconSelector.png">
  `;
}

async function addNewSubTasksBoard() {
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

function checkSubtasks(completedTasks, subtaskLength, completedProgress, id) {
  if (subtaskLength == 0) {
    return `
    <div class="progressStatus d-none" id="progressStatus${id}"></div>
    `;
  } else {
    return `
    <div class="progressStatus" id="progressStatus${id}">
        <div class="progress">
          <div class="progressCompleted" style="width: ${completedProgress}%;"></div>
        </div>
      <span>${completedTasks}/${subtaskLength} Done</span>
    </div>
    `;
  }
}
