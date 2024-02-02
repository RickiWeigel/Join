async function getPriorityImageUrlPopup(priority) {
  let priorityInfo = {
    Low: { text: "Low", imgSrc: "/assets/img/board/iconLowSmall.png" },
    Medium: { text: "Medium", imgSrc: "/assets/img/board/iconMediumSmall.png" },
    Urgent: { text: "Urgent", imgSrc: "/assets/img/board/iconUrgentSmall.png" },
  };
  let element = document.getElementById("popupTaskPriority");
  let info = priorityInfo[priority];
  if (info) {
    element.innerHTML = `
        <span>${info.text}</span>
        <img src="${info.imgSrc}">
      `;
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
  document.getElementById("popupContainer").innerHTML = `
    <div class="popupTask" id="popupTask" onclick="event.stopPropagation()">
      <div class="popupTaskContent" id="popupTaskContent">
      ${renderPopupTemplateTop(userTask)}
      ${renderPopupTemplateMid(userTask)}
      ${renderPopupTemplateBot(userTask, id)}
    `;
  hideSubtaskHeadlineIfZeroSubtasks(userTask);
  await getPriorityImageUrlPopup(userTask.priority);
  renderSubtasksTask(id);
  renderContactsPopup(id);
}

async function renderEditPopup(id) {
  let userTask = users[activeUser].userTasks[id];
  document.getElementById("popupContainer").innerHTML = `
     ${renderEditPopupFormTemplate(id, userTask)}
    `;
  await renderSubtasksTaskEdit(id);
  renderPrioritySelected(userTask.priority);
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

function renderPopupAddTask(addTaskStatus) {
  selectProgressStatus = addTaskStatus;
  document.getElementById("popupContainer").innerHTML = `
      ${renderPopupAddTaskTemplate()}
    `;
}

async function addTaskPopup() {
  const requiredFieldsValid = await checkRequired();
  if (requiredFieldsValid) {
    await addTask();
    setTimeout(function () {
      hidePopupAddTask();
    }, 1000);
  }
  groupTasksByProgressStatus(users[activeUser]);
}

async function openPopupAddTask(addTaskStatus) {
  selectedSubtasks = [];
  renderPopupAddTask(addTaskStatus);
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupAddTask");
  popupContainer.classList.remove("hidePopup");
  popupContainer.classList.add("containerPopupActive");
  popupTask.classList.add("popupAddTaskSlideIn");
  hidePopupStatus = 1;
  renderPrioritySelected("Medium");
}

function hidePopupAddTask() {
  const popupContainer = document.getElementById("popupContainer");
  const popupTask = document.getElementById("popupAddTask");
  popupTask.classList.add("popupAddTaskSlideOut");
  popupContainer.classList.remove("containerPopupActive");
  popupContainer.classList.add("hidePopup");
  hidePopupStatus = 0;
}
