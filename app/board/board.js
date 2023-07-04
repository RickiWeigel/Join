let currentSubtasks = [];
let currentDraggedElement;

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
    let taskTitle = taskCards[i].getElementsByClassName("taskHeadline")[0].innerText.toLowerCase();
    
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

function moveTo(status, StatusCardId) {
  let userTask = users[activeUser].userTasks[currentDraggedElement];
  userTask.progressStatus = status;
  document.getElementById(StatusCardId).classList.remove("statusCardHighlight");
  groupTasksByProgressStatus(users[activeUser]);
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

function getPriorityImageUrlPopup(priority) {
  if (priority == "Low") {
    return "../../assets/img/board/LowPopUpicon.png";
  } else if (priority == "Medium") {
    return "../../assets/img/board/MidPopUpicon.png";
  } else if (priority == "Urgent") {
    return "../../assets/img/board/HardPopUpicon.png";
  }
}

function openPopupTask(id) {
  renderPopup(id);
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupTask");
  popupContainer.classList.remove("hidePopup");
  popupContainer.classList.add("containerPopupActive");
  popupTask.classList.add("popupTaskSlideIn");
}

function hidePopupTask() {
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupTask");
  popupTask.classList.add("popupTaskSlideOut");
  popupContainer.classList.remove("containerPopupActive");
  popupContainer.classList.add("hidePopup");
  groupTasksByProgressStatus(users[activeUser]);
}

function renderPopup(id) {
  let userTask = users[activeUser].userTasks[id];
  let priorityImageUrl = getPriorityImageUrlPopup(userTask.priority);
  document.getElementById("popupContainer").innerHTML = /*html*/ `
  <div class="popupTask" id="popupTask" onclick="event.stopPropagation()">
    <div class="popupTaskContent" id="popupTaskContent">
      <div class="popupCategoryHeadline" style="background: ${userTask.category.color};">
        <span>${userTask.category.name}</span>
      </div>
      <div class="popupTaskHeadline">
        <span>${userTask.taskTitle}</span>
      </div>
      <span class="popupBoxDescription">${userTask.taskDescription}</span>
      <div class="popupDivContainer">
        <span><b>Due date: </b></span>
        <span>${userTask.toDueDate}</span>
      </div>
      <div class="popupDivContainer">
        <span><b>Priority: </b></span>
        <div class="popupTaskPriority"><img src="${priorityImageUrl}"></div>
      </div>
      <div class="popupSubtaskContainer">
        <span><b>Subtasks:</b></span>
          <div id="popupSubtasks"></div>
      </div>
      <div class="popupAssignedToContainer" id="popupAssignedTo">
        <span><b>Assigned To:</b></span>
      </div>

      <div class="deleteEdit">
        <div class="deleteContainer" onclick="deleteCurrentTask(id)" id="deleteButton"></div>
        <div class="editContainer" id="editButton"></div>
      </div>

    </div>
  </div>
  `;
  renderSubtasks(id);
  renderContactsPopup(id);
}

async function renderSubtasks(id) {
  document.getElementById("popupSubtasks").innerHTML = "";
  for (let i = 0; i < users[activeUser].userTasks[id].subtasks.length; i++) {
    document.getElementById("popupSubtasks").innerHTML += `
    <div class="subtask" onclick="addToSelectedSubtasks(${id}, ${i})">
      <img id='checkbox[${i}]' src="../../assets/img/functionButtons/checkbox.png">
      <span>${users[activeUser].userTasks[id].subtasks[i]}</span>
    </div>
    `;
  }
  updateCheckboxStatus(id);
}

async function addToSelectedSubtasks(id, i) {
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

function updateCheckboxStatus(id) {
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

function editDeleteButtonHover(button){
  const hover = document.getElementById(button);
  hover.src = `../../assets/img/functionButtons/${button}Hover.png`; 
}


function allowDrop(ev) {
  ev.preventDefault();
}

async function deleteCurrentTask(id){
  hidePopupTask();
  users[activeUser].userTasks.splice(id,1);
  // await setItem(`users`, JSON.stringify(users)); 
  groupTasksByProgressStatus(users[activeUser]);
}