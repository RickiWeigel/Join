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

function sortProgress(task, i) {
  switch (task.progressStatus) {
    case "toDo":
      renderTodoTasks("toDoTasks", i);
      break;
    case "inProgress":
      renderTodoTasks("inProgressTasks", i);
      break;
    case "awaitFeedback":
      renderTodoTasks("awaitFeedbackTasks", i);
      break;
    case "done":
      renderTodoTasks("doneTasks", i);
      break;
  }
}

function renderTodoTasks(taskStatus, i) {
  let userTask = users[activeUser].userTasks[i];
  let priorityImageUrl = getPriorityImageUrl(userTask.priority);
  document.getElementById(taskStatus).innerHTML +=`
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
        <div class="progress"></div>
        <span>0/${userTask.subtasks.length} Done</span>
    </div>
    <div class="taskFooter">
        <div class="taskContacts" id="taskContacts">
            <div class="contact box0">
                <span id="contactInitials1">SM</span>
            </div>
            <div class="contact box1">
                <span id="contactInitials2">BM</span>
            </div>
        </div>
        <div class="taskPriority"><img src="${priorityImageUrl}"></div>
    </div>
  </div>
  `;
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