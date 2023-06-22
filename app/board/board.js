let completedTask = [];
let currentSubtasks = [];

async function boardInit() {
  await mainInit();
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
  let priorityImageUrl = getPriorityImageUrl(userTask.priority);
  document.getElementById(taskStatus).innerHTML += `
  <div class="taskCard">
    <div class="categoryHeadline" style="background: ${userTask.category.color};">
        <span>${userTask.category.name}</span>
    </div>
    <div class="taskHeadline">
        <span>${userTask.taskTitle}</span>
    </div>
    <div class="taskDescription">
        <span>${userTask.taskDescription}</span>
    </div>
    <div class="progressStatus">
        <div class="progress">
          <div class="progressCompleted" style="width: 80%;"></div>
        </div>
        <span>0/${userTask.subtasks.length} Done</span>
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

function openPopupTask() {
  const popupContainer = document.getElementById('popupContainer');
  
  popupContainer.classList.remove('hidePopup');
  popupContainer.classList.add('popupActive');
}

function hidePopupTask(){
  const popupContainer = document.getElementById('popupContainer');
  popupContainer.classList.remove('popupActive');
  popupContainer.classList.add('hidePopup');
}

// white-space: nowrap; /* Verhindert den Zeilenumbruch */
// overflow: hidden; /* Versteckt den überschüssigen Text */
// text-overflow: ellipsis;