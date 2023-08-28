let currentSubtasks = [];
let currentDraggedElement;
let hidePopupStatus;

async function boardInit() {
  await mainInit();
  highlightedNavbar(2);
  groupTasksByProgressStatus(users[activeUser]);
}



function groupTasksByProgressStatus(user) {
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
    let taskTitle = taskCards[i]
      .getElementsByClassName("taskHeadline")[0]
      .innerText.toLowerCase();

    if (startsWithLetters(taskTitle, searchInput)) {
      taskCards[i].style.display = "block";
    } else {
      taskCards[i].style.display = "none";
    }
  }
}

function startsWithLetters(taskTitle, searchInput) {
  let taskWords = taskTitle.split(" ");

  for (let i = 0; i < searchInput.length; i++) {
    let char = searchInput[i];
    let found = false;

    for (let j = 0; j < taskWords.length; j++) {
      let word = taskWords[j];
      if (word.length >= i + 1 && word[i] === char) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
}

function sortProgress(task, id) {
  switch (task.progressStatus) {
    case "toDo":
      renderTodoTasks("toDoTasks", id);
      tasksInTodo++;
      break;
    case "inProgress":
      renderTodoTasks("inProgressTasks", id);
      tasksInProgress++;
      break;
    case "awaitFeedback":
      renderTodoTasks("awaitFeedbackTasks", id);
      tasksInAwaitFeedback++;
      break;
    case "done":
      renderTodoTasks("doneTasks", id);
      tasksInDone++;
      break;
  }
}

function renderTodoTasks(taskStatus, id) {
  let userTask = users[activeUser].userTasks[id];
  let completedTasks = userTask.completedTasks.length;
  let subtaskLength = userTask.subtasks.length;
  let completedProgress = completedProgresses(completedTasks, subtaskLength);
  let priorityImageUrl = getPriorityImageUrl(userTask.priority);
  document.getElementById(taskStatus).innerHTML += `
  <div draggable="true" ondragstart="startDragging(${id})" class="taskCard" id="taskCard${id}" onclick="openPopupTask(${id})">
    <div class="categoryHeadline" style="background: ${userTask.category.color};">
        <span>${userTask.category.name}</span>
    </div>
    <div class="taskHeadline">
        <span>${userTask.taskTitle}</span>
    </div>
    <span class="boxDescription">${userTask.taskDescription}</span>
    <div class="progressStatus">
        <div class="progress">
          <div class="progressCompleted" style="width: ${completedProgress}%;"></div>
        </div>
        <span>${completedTasks}/${subtaskLength} Done</span>
    </div>
    <div class="taskFooter">
        <div class="taskContacts" id="taskContacts${id}">
        </div>
        <div class="taskPriority"><img src="${priorityImageUrl}"></div>
    </div>
  </div>
  `;
  renderContactInitials(id);
}

function startDragging(id) {
  currentDraggedElement = id;
}

async function moveTo(status, StatusCardId) {
  let userTask = users[activeUser].userTasks[currentDraggedElement];
  userTask.progressStatus = status;
  document.getElementById(StatusCardId).classList.remove("statusCardHighlight");
  groupTasksByProgressStatus(users[activeUser]);
  await setItem(`users`, JSON.stringify(users));
}

function statusCardHighlight(StatusCardId) {
  document.getElementById(StatusCardId).classList.add("statusCardHighlight");
}

function removeHighlight(StatusCardId) {
  document.getElementById(StatusCardId).classList.remove("statusCardHighlight");
}

function completedProgresses(completedTasks, subtaskLength) {
  let progress = (completedTasks / subtaskLength) * 100;
  return progress;
}

function renderContactInitials(id) {
  document.getElementById(`taskContacts${id}`).innerHTML = ``;
  let userContact = users[activeUser].userTasks[id].assignedTo;

  for (let j = 0; j < userContact.length; j++) {
    let newColor = userContact[j].color;

    if (userContact.length < 3) {
      document.getElementById(`taskContacts${id}`).innerHTML += `
      <div class="contact box${j}" style="background-color: ${newColor};">
        <span id="contactInitials">${userContact[j].initials}</span>
      </div>`;
    } else {
      document.getElementById(`taskContacts${id}`).innerHTML = `
        <div class="contact box${0}" style="background-color: ${newColor};">
          <span id="contactInitials">${userContact[0].initials}</span>
        </div>
        <div class="contact box${1}" style="background-color: ${newColor};">
          <span id="contactInitials">${userContact[1].initials}</span>
        </div>        
        `;

      document.getElementById(`taskContacts${id}`).innerHTML += `
      <div class="contact boxRest">
        <span id="contactInitials">+${userContact.length - 2}</span>
      </div>             
      `;
    }
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
    return "../../assets/img/board/iconLow.png";
  } else if (priority == "Medium") {
    return "../../assets/img/board/iconMid.png";
  } else if (priority == "Urgent") {
    return "../../assets/img/board/iconHard.png";
  }
}

async function getPriorityImageUrlPopup(priority) {
  let element = document.getElementById("popupTaskPriority");
  if (priority == "Low") {
    return (element.innerHTML = `
    <span>Low</span>
    <img src="../../assets/img/board/iconLowSmall.png">
    `);
  } else if (priority == "Medium") {
    return (element.innerHTML = `
    <span>Low</span>
    <img src="../../assets/img/board/iconMediumSmall.png">
    `);
  } else if (priority == "Urgent") {
    return (element.innerHTML = `
    <span>Low</span>
    <img src="../../assets/img/board/iconUrgentSmall.png">
    `);
  }
}

function openPopupTask(id) {
  hidePopupStatus = 0;
  renderPopup(id);
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupTask");
  popupContainer.classList.remove("hidePopup");
  popupContainer.classList.add("containerPopupActive");
  popupTask.classList.add("popupTaskSlideIn");
}

function openEdit(userTaskCategoryName, userTaskCategoryColor, id) {
  selectedCategory = {
    color: userTaskCategoryColor,
    name: userTaskCategoryName,
  };
  renderEditPopup(id);
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupTask");
  popupContainer.classList.remove("hidePopup");
  popupContainer.classList.add("containerPopupActive");
  popupTask.classList.add("popupTaskSlideIn");
}

function hidePopup() {
  if (hidePopupStatus == 0) {
    hidePopupTask();
  } else {
    hidePopupAddTask();
  }
}

function hidePopupTask() {
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupTask");
  popupTask.classList.add("popupTaskSlideOut");
  popupContainer.classList.remove("containerPopupActive");
  popupContainer.classList.add("hidePopup");
  groupTasksByProgressStatus(users[activeUser]);
  hidePopupStatus = 0;
}

async function renderPopup(id) {
  let userTask = users[activeUser].userTasks[id];
  // let priorityImageUrl = getPriorityImageUrlPopup(userTask.priority);
  document.getElementById("popupContainer").innerHTML = `
  <div class="popupTask" id="popupTask" onclick="event.stopPropagation()">
    <div class="popupTaskContent" id="popupTaskContent">
      <div class="headline">
        <div class="popupCategoryHeadline" style="background: ${userTask.category.color};">
          <span>${userTask.category.name}</span>
        </div>
        <div class="closePopup" ><img id="closeBtn" onmouseover="closeHover()" onmouseleave="closeLeave()" onclick=hidePopup() src="../../assets/img/functionButtons/close.png"></div>
      </div>
      <div class="popupTaskHeadline">
        <span>${userTask.taskTitle}</span>
      </div>
      <span class="popupBoxDescription">${userTask.taskDescription}</span>
      <div class="popupDivContainer">
        <span class="subHeading">Due date:</span>
        <span>${userTask.toDueDate}</span>
      </div>

      <div class="popupDivContainer">
        <span class="subHeading">Priority:</span>
        <div class="popupTaskPriority" id="popupTaskPriority"> 
        </div>

      </div>
      <div class="popupAssignedToContainer" id="popupAssignedTo">
        <span class="subHeading">Assigned To:</span>
      </div>

      <div class="popupSubtaskContainer">
        <span class="subHeading">Subtasks:</span>
          <div id="popupSubtasks"></div>
      </div>

      <div class="deleteEdit">
        <div onmouseover="btnHover('deleteButton')" onmouseleave="btnLeave('deleteButton')" class="deleteContainer" onclick="deleteCurrentTask(${id})" >
          <img id="deleteButton" src="../../assets/img/functionButtons/delete.png">
          <span style="width: 50px;">Delete</span>
        </div>
        <img src="../../assets/img/functionButtons/trennstrich.png" height="24px">
        <div onmouseover="btnHover('editButton')" onmouseleave="btnLeave('editButton')" class="editContainer" onclick="openEdit('${userTask.category.name}','${userTask.category.color}',${id})" >
          <img id="editButton" src="../../assets/img/functionButtons/edit.png">
          <span style="width: 35px;">Edit</span>
        </div>
      </div>
    </div>
  </div>
  `;
  await getPriorityImageUrlPopup(userTask.priority);
  renderSubtasksTask(id);
  renderContactsPopup(id);
}

async function renderEditPopup(id) {
  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "dd/mm/yy", // Format des ausgewählten Datums
      inline: true,
      changeMonth: true,
      changeYear: true,
    });
  });
  let userTask = users[activeUser].userTasks[id];
  document.getElementById("popupContainer").innerHTML = `
  <form onsubmit="editTask(users[${activeUser}].userTasks[${id}], ${id}); return false;" class="popupTask" id="popupTask" onclick="event.stopPropagation()">
    <div style=padding-right:40px; class="closePopupEdit" ><img id="closeBtn" onmouseover="closeHover()" onmouseleave="closeLeave()" onclick=hidePopup("hidePopupTask()") src="../../assets/img/functionButtons/close.png"></div>
    <div class="popupTaskContent" id="popupTaskContent">
                
                
                <div class="section1">
                  <div class="titleContainer">
                    <div class="enterTitle">
                        <input id="taskTitleEdit" type="text" placeholder="Enter a title" value="${userTask.taskTitle}" required>                        
                    </div>
                    <div class="required">required</div>
                  </div>

                  <div class="descriptionContainer">
                    <div class="descriptionContent">
                        <span class="subHeadline">Description</span>
                        <textarea required name="descriptionTextarea" id="descriptionEdit"
                            cols="30" rows="10">${userTask.taskDescription}</textarea>
                    </div>
                    <div class="required">required</div>
                  </div>

                  <div class="dueDate">
                    <span>Due date</span>
                    <div class="dateContainer">
                        <input type="text" placeholder="dd/mm/yyyy" id="datepicker" value="${userTask.toDueDate}" autocomplete="off" required>
                        <img src="../../assets/img/board/calendar.png">
                    </div>
                    <div class="required">required</div>
                  </div>
                    
                </div>

                <div id="showPriorities" class="priorityContainer">
                    <img onmouseover="priorityMouseHover('red')" onmouseleave="priorityMouseLeave('priorityUrgent')"
                        onclick="renderPrioritySelected('Urgent')" class="priority priorityUrgent" id="priorityUrgent"
                        src="../../assets/img/addTask/TaskValueHard.png">
                    <img onmouseover="priorityMouseHover('orange')" onmouseleave="priorityMouseLeave('priorityMedium')"
                        onclick="renderPrioritySelected('Medium')" class="priority priorityMedium" id="priorityMedium"
                        src="../../assets/img/addTask/TaskValueMid.png">
                    <img onmouseover="priorityMouseHover('green')" onmouseleave="priorityMouseLeave('priorityLow')"
                        onclick="renderPrioritySelected('Low')" class="priority priorityLow" id="priorityLow"
                        src="../../assets/img/addTask/TaskValueLow.png">
                </div>

                <div id="showInviteNewContact" class="selectContacts d-none">
                    <input id="inviteNewContact" type="text" placeholder="Contact email" style="font-size: 19px;">
                    <img onclick="toggleInviteNewContact()" src="/assets/img/functionButtons/cancelBlue.png">
                    <img style="padding-left: 8px; padding-right: 8px;"
                        src="/assets/img/functionButtons/trennstrich.png">
                    <img onclick="addNewInviteContact()" src="/assets/img/functionButtons/checkedIconSelector.png">
                </div>

                <div class="category">
                    <span class="subHeadline">Category</span>
                    <div id="showCategory" class="selectCategory" onclick="renderCategoriesEdit()">
                        <div id="currentCategory">
                          <span>${userTask.category.name}</span>
                          <div class="colorCircle" style="background: ${userTask.category.color};"></div>
                        </div>
                        <img src="../../assets/img/functionButtons/selectorArrow.png">
                    </div>
                    <div id="showNewCategory" class="selectCategory d-none">
                    <input id="addNewCategory" type="text" placeholder="New category name" style="font-size: 19px;">
                    <img onclick="hideNewCategory()" src="/assets/img/functionButtons/cancelBlue.png">
                    <img style="padding-left: 8px; padding-right: 8px;"
                        src="/assets/img/functionButtons/trennstrich.png">
                    <img onclick="addNewCategoryFunction()" src="/assets/img/functionButtons/checkedIconSelector.png">
                
                    </div>

                <div class="dropDownContainer">
                    <div>
                        <div id="colorCircle" class="circle-content d-none">
                            <div id="lightblue" onclick="addCategoryColor('lightblue')" class="colorCircle"
                                style="background: #8AA4FF;"></div>
                            <div id="red" onclick="addCategoryColor('red')" class="colorCircle"
                                style="background: #FF0000;"></div>
                            <div id="green" onclick="addCategoryColor('green')" class="colorCircle"
                                style="background: #2AD300;"></div>
                            <div id="orange" onclick="addCategoryColor('orange')" class="colorCircle"
                                style="background: #FF8A00;"></div>
                            <div id="pink" onclick="addCategoryColor('pink')" class="colorCircle"
                                style="background: #E200BE;"></div>
                            <div id="blue" onclick="addCategoryColor('blue')" class="colorCircle"
                                style="background: #0038FF;"></div>
                        </div>
                        <div style="max-height: 204px; overflow: auto;" id="selectTaskCategory">
                        </div>
                    </div>
                </div>
                </div>

                

                <div class="category">
                    <span>Assigned to</span>
                    <div class="selectContacts" id="selectContacts" onclick="renderContactsToAssignEdit(${id});">
                      <span>Select contacts to assign</span>
                      <img src="../../assets/img/functionButtons/selectorArrow.png">
                    </div>
                    <div class="dropDownContainer">
                      <div>
                        <div style="max-height: 204px; overflow: auto;" id="contactsToAssign">
                        </div>
                      </div>
                    </div>
                </div>


                <div class="subtaskContainer">
                    <span>Subtasks</span>
                    <div id="subtask" class="addSubtask">
                        <input id="subtaskInput" onclick="subtaskActiveInputEdit(${id})" type="text"
                            placeholder="Add new subtask">
                        <div id="subtaskButtons" style="display: flex; align-items: center;">
                            <img src="../../assets/img/functionButtons/add.png">
                        </div>
                    </div>
                  <div id="popupSubtasksEdit" class="subtaskContent"></div>
                </div>
                


                <div class="edit-btn-container">
                  <button class="btn-blue">Creat Task 
                  <img src="/assets/img/functionButtons/akar-icons_check.png"></button>
                </div>
            </div>
    </form>
  `;
  await renderSubtasksTaskEdit(id);
  renderPrioritySelected(userTask.priority);
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
      document.getElementById("selectTaskCategory").innerHTML += `
        <div onclick="setSelectedCategoryEdit('${i}')" class="dropdown-content">
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
    <div class="subtask" onclick="" onmouseover="subtaskEditHover(${i})"  onmouseleave="subtaskEditLeave(${i})">
      <img id='checkboxEdit[${i}]' src="../../assets/img/functionButtons/checkbox.png">
      <span>${users[activeUser].userTasks[id].subtasks[i]}</span>
      <span onclick="subtaskDeleteEdit(${id},${i})" class="deleteBtn d-none" id="deleteBtn-${i}">delete</span>
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
  const deletedSubtask = currentSubtask.splice(i, 1)[0]; // Das gelöschte Subtask-Element

  // Durchsuche completedTasks und entferne das entsprechende Element
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
  users[activeUser].userTasks[id].subtasks.push(newSubtask);
  await setItem(`users`, JSON.stringify(users));
  newSubtask = document.getElementById("subtaskInput").value = "";
  clearSubtaskInput();
  await renderSubtasksTaskEdit(id);
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

function renderContactsPopup(id) {
  let userContact = users[activeUser].userTasks[id].assignedTo;
  for (let j = 0; j < userContact.length; j++) {
    let contactColor = userContact[j].color;
    document.getElementById("popupAssignedTo").innerHTML += `
    <div class="popupAssignedTo" >
      <div class="contact box" style="background-color: ${contactColor}">
      <span id="contactInitials">${userContact[j].initials}</span>
      </div>
      <span>${userContact[j].name}</span>
    </div>
    `;
  }
}

function allowDrop(ev) {
  ev.preventDefault();
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

  for (let i = 0; i < contacts.length; i++) {
    let isAssigned = false;
    for (const assigned of assignedTo) {
      if (contacts[i].email === assigned.email) {
        isAssigned = true;
      }
    }
    const contactSelector = document.getElementById(`contactSelector[${i}]`);
    if (contactSelector) {
      if (isAssigned) {
        contactSelector.src =
          "/assets/img/functionButtons/checkButtonChecked.png";
      } else {
        contactSelector.src = "/assets/img/functionButtons/checkButton.png";
      }
    }
  }
}

async function selectContactsToAssignEdit(id, currentContactId) {
  const currentContactEmail =
    users[activeUser].contacts[currentContactId].email;
  const contactAssignedTo = users[activeUser].userTasks[id].assignedTo;

  let isContactAssigned = false;
  for (let i = 0; i < contactAssignedTo.length; i++) {
    if (contactAssignedTo[i].email === currentContactEmail) {
      isContactAssigned = true;
      break;
    }
  }
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
  if (newSubtask.length < 2) {
    console.log("Zu kurz"); //Fehlt noch die Meldung im Browser
  } else {
    newSubtasks.push(newSubtask);
    await setItem(`users`, JSON.stringify(users));
    newSubtask = document.getElementById("subtaskInput").value = "";
    clearSubtaskInput();
    renderSubtasksBoard();
  }
}

async function renderSubtasksBoard() {
  document.getElementById("addedSubtasks").innerHTML = "";
  for (let i = newSubtasks.length - 1; i >= 0; i--) {
    document.getElementById("addedSubtasks").innerHTML += `
          <div onclick="addToSelectedSubtasks(${i})" class="subtasks">
              <img id="checkbox[${i}]" src="../../assets/img/functionButtons/checkbox.png">
              <span id="subtasks">${newSubtasks[i]}</span>
          </div>
      `;
  }
  // Scrollen Sie den "boardAddTaskSection"-Container nach unten
  const addTaskContentBoard = document.getElementById("boardAddTaskSection");
  addTaskContentBoard.scrollTop = addTaskContentBoard.scrollHeight;
}



 function renderPopupAddTask(addTaskStatus) {
  $(function () {
    $("#datepicker2").datepicker({
      dateFormat: "dd/mm/yy", // Format des ausgewählten Datums
      inline: true,
      changeMonth: true,
      changeYear: true,
    });
  });
  selectProgressStatus = addTaskStatus;
  document.getElementById("popupContainer").innerHTML = `
  <div class="popupAddTask" id="popupAddTask" onclick="event.stopPropagation()">
    <div class="titleAddTask">Add Task</div>
    <form onsubmit="addTask(); return false;" class="addTaskForm">
        <div  class="boardAddTaskContent" id="addTaskContent">
            <div class="boardAddTaskSection" id="boardAddTaskSection">
                <div class="enterTitle">
                    <input id="taskTitle" type="text" placeholder="Enter a title" required>
                </div>

                <div class="descriptionContent">
                    <span>Description</span>
                    <textarea required name="descriptionTextarea" placeholder="Enter a description" id="description"
                        cols="30" rows="10"></textarea>
                </div>

                <div class="dueDate">
                    <span>Due date</span>
                    <div class="dateContainer">
                        <input type="text" placeholder="dd/mm/yyyy" id="datepicker2" autocomplete="off"
                            required></input>
                        <img src="../../assets/img/board/calendar.png">
                    </div>
                </div>

                <div class="priorityClass">
                    <span>Priority</span>
                    <div id="showPriorities" class="priorityContainer">
                        <img onmouseover="priorityMouseHover('red')"
                            onmouseleave="priorityMouseLeave('priorityUrgent')"
                            onclick="renderPrioritySelected('Urgent')" class="priority priorityUrgent"
                            id="priorityUrgent" src="../../assets/img/addTask/TaskValueHard.png">
                        <img onmouseover="priorityMouseHover('orange')"
                            onmouseleave="priorityMouseLeave('priorityMedium')"
                            onclick="renderPrioritySelected('Medium')" class="priority priorityMedium"
                            id="priorityMedium" src="../../assets/img/addTask/TaskValueMid.png">
                        <img onmouseover="priorityMouseHover('green')"
                            onmouseleave="priorityMouseLeave('priorityLow')" onclick="renderPrioritySelected('Low')"
                            class="priority priorityLow" id="priorityLow"
                            src="../../assets/img/addTask/TaskValueLow.png">
                    </div>
                </div>

                <div class="assignedTo">
                    <span>Assigne to</span>
                    <div id="showInviteNewContact" class="selectContacts d-none">
                        <input id="inviteNewContact" type="text" placeholder="Contact email"
                            style="font-size: 19px;">
                        <img onclick="toggleInviteNewContact()" src="/assets/img/functionButtons/cancelBlue.png">
                        <img style="padding-left: 8px; padding-right: 8px;"
                            src="/assets/img/functionButtons/trennstrich.png">
                        <img onclick="addNewInviteContact()"
                            src="/assets/img/functionButtons/checkedIconSelector.png">
                    </div>

                    <div class="selectContacts" id="selectContacts" onclick="renderContactsToAssign()">
                        <span>Select contacts to assign</span>
                        <img src="../../assets/img/functionButtons/selectorArrow.png">
                    </div>

                    <div class="dropDownContainer">
                        <div>
                            <div style="max-height: 204px; overflow: auto;" id="contactsToAssign">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="category">
                    <span>Category</span>
                    <div id="showCategory" class="selectCategory" onclick="renderCategories()">
                        <div id="currentCategory"><span>Select task category</span></div>
                        <img src="../../assets/img/functionButtons/selectorArrow.png">

                    </div>
                    <div id="showNewCategory" class="selectCategory d-none">
                        <input id="addNewCategory" type="text" placeholder="New category name"
                            style="font-size: 19px;">
                        <img onclick="hideNewCategory()" src="/assets/img/functionButtons/cancelBlue.png">
                        <img style="padding-left: 8px; padding-right: 8px;"
                            src="/assets/img/functionButtons/trennstrich.png">
                        <img onclick="addNewCategoryFunction()"
                            src="/assets/img/functionButtons/checkedIconSelector.png">
                    </div>
                    <div class="dropDownContainer">
                        <div>
                            <div id="colorCircle" class="circle-content d-none">
                                <div id="lightblue" onclick="addCategoryColor('lightblue')" class="colorCircle"
                                    style="background: #8AA4FF;"></div>
                                <div id="red" onclick="addCategoryColor('red')" class="colorCircle"
                                    style="background: #FF0000;"></div>
                                <div id="green" onclick="addCategoryColor('green')" class="colorCircle"
                                    style="background: #2AD300;"></div>
                                <div id="orange" onclick="addCategoryColor('orange')" class="colorCircle"
                                    style="background: #FF8A00;"></div>
                                <div id="pink" onclick="addCategoryColor('pink')" class="colorCircle"
                                    style="background: #E200BE;"></div>
                                <div id="blue" onclick="addCategoryColor('blue')" class="colorCircle"
                                    style="background: #0038FF;"></div>
                            </div>
                            <div style="max-height: 204px; overflow: auto;" id="selectTaskCategory">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="subtaskContainer">
                    <span>Subtasks</span>

                    <div id="subtask" class="addSubtask">
                        <input id="subtaskInput" onclick="subtaskActiveInputBoard()" type="text"
                            placeholder="Add new subtask">
                        <div id="subtaskButtons" style="display: flex; align-items: center;">
                            <img src="../../assets/img/functionButtons/add.png">
                        </div>
                    </div>
                    
                </div>
                <div id="addedSubtasks" class="subtaskContent"></div>
                
            </div>
        </div>
        
        <div class="btn-container-AddTask">
            <button class="btn-blue">Creat Task <img
                    src="/assets/img/functionButtons/akar-icons_check.png"></button>
        </div>
    </form>
  </div>
  `;
 
}

async function openPopupAddTask(addTaskStatus) {
  renderPopupAddTask(addTaskStatus);
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupAddTask");
  popupContainer.classList.remove("hidePopup");
  popupContainer.classList.add("containerPopupActive");
  popupTask.classList.add("popupAddTaskSlideIn");
  hidePopupStatus = 1;
}

function hidePopupAddTask() {
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupAddTask");
  popupTask.classList.add("popupAddTaskSlideOut");
  popupContainer.classList.remove("containerPopupActive");
  popupContainer.classList.add("hidePopup");
  hidePopupStatus = 0;
}

// function hidePopupAddTask() {
//   const popupContainer = document.getElementById("popupContainer");
//   const popupTask = document.getElementById("popupTask");
//   popupTask.classList.add("popupTaskSlideOut");
//   popupContainer.classList.remove("containerPopupActive");
//   popupContainer.classList.add("hidePopup");
//   groupTasksByProgressStatus(users[activeUser]);
// }
