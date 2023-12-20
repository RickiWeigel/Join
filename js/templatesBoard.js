function renderTaskCardForStatusTemplate(
  userTask,
  completedTasks,
  subtaskLength,
  completedProgress,
  priorityImageUrl,
  id
) {
  return `
<div draggable="true" ondragstart="startDragging(${id})" class="taskCard" id="taskCard${id}" onclick="openPopupTask(${id})">
    <div class="categoryHeadlineContainer">
      <div class="categoryHeadline" style="background: ${userTask.category.color};">
          <span>${userTask.category.name}</span>
      </div>
      <img onclick="event.stopPropagation(); openDragMenu()" class="drag-icon" src="assets/img/functionButtons/drag-and-drop-responsiv.png">
    </div>
    
    <div class="taskHeadline">
        <span>${userTask.taskTitle}</span>
    </div>
    <span class="boxDescription">${userTask.taskDescription}</span>
    ${checkSubtasks(completedTasks, subtaskLength, completedProgress, id)}
    <div class="taskFooter">
        <div class="taskContacts" id="taskContacts${id}">
        </div>
        <div class="taskPriority"><img src="${priorityImageUrl}"></div>
    </div>
</div>
    `;
}

function renderContactInitialsLongTemplate(taskContact, newColor, userContact) {
  taskContact.innerHTML = `
        <div class="contact box${0}" style="background-color: ${newColor};">
          <span id="contactInitials">${userContact[0].initials}</span>
        </div>
        <div class="contact box${1}" style="background-color: ${newColor};">
          <span id="contactInitials">${userContact[1].initials}</span>
        </div>        
        `;
  taskContact.innerHTML += `
      <div class="contact boxRest">
        <span id="contactInitials">+${userContact.length - 2}</span>
      </div>             
      `;
}

function renderPopupTemplateTop(userTask) {
  return `
<header class="headlinePopup">
  <div class="popupCategoryHeadline" style="background: ${userTask.category.color};">
    <span>${userTask.category.name}</span>
  </div>
  <div class="closePopup" ><img id="closeBtn" onmouseover="closeHover()" onmouseleave="closeLeave()" onclick=hidePopup() src="../../assets/img/functionButtons/close.png"></div>
</header>

<div class="popupTaskHeadline">
  <span>${userTask.taskTitle}</span>
</div>

<span class="popupBoxDescription">${userTask.taskDescription}</span>
  `;
}

function renderPopupTemplateMid(userTask) {
  return `
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

<div class="popupSubtaskContainer" id="subHeading">
<span class="subHeading" >Subtasks:</span>
  <div id="popupSubtasks"></div>
</div>
`;
}

function renderPopupTemplateBot(userTask, id) {
  return `
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
}

function renderEditPopupTemplateTop(userTask) {
  return `
<div class="section1">
  <div class="titleContainer">
      <div class="enterTitle">
          <input id="taskTitleEdit" type="text" placeholder="Enter a title" value="${userTask.taskTitle}"
              >
      </div>
      <div id="requiredTitle" class="required v-none">Please enter a title!</div>
  </div>

  <div class="descriptionContainer">
      <div class="descriptionContent">
          <span class="subHeadline">Description</span>
          <textarea name="descriptionTextarea" id="descriptionEdit" cols="30"
              rows="10">${userTask.taskDescription}</textarea>
      </div>
      <div id="requiredDescription" class="required v-none">Please enter a description!</div>
  </div>

  <div class="dueDateContainer">
      <div class="dueDate">
          <span>Due date</span>
          <div class="dateContainer" onclick="openCalendar()">
              <input class="inputGrey" type="text" value="${userTask.toDueDate}" id="datepicker"
                  onfocus="changeTypInDate();this.showPicker();" onblur="retainDateValue(this);"
                  autocomplete="off"></input>
              <img src="../../assets/img/board/calendar.png">
          </div>
      </div>
      <div id="requiredDate" class="required v-none">Please enter a date!</div>
  </div>
</div>
`;
}

function renderEditPopupTemplatePriorities() {
  return `
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
`;
}

function renderEditPopupTemplateCategories(userTask) {
  return `
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
`;
}

function renderEditPopupTemplateAssignedTo(id) {
  return `
<div class="category">
  <span>Assigned to</span>
  <div id="showInviteNewContact" class="selectContacts d-none">
    <input id="inviteNewContact" type="text" placeholder="Contact email" style="font-size: 19px;">
    <img onclick="toggleInviteNewContact()" src="/assets/img/functionButtons/cancelBlue.png">
    <img style="padding-left: 8px; padding-right: 8px;" src="/assets/img/functionButtons/trennstrich.png">
    <img onclick="addNewInviteContact()" src="/assets/img/functionButtons/checkedIconSelector.png">
  </div>
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
`;
}

function renderEditPopupTemplateSubtastks(id) {
  return `
<div class="subtaskContainer">
  <span>Subtasks</span>
  <div id="subtask" class="addSubtask">
      <input id="subtaskInput" onclick="subtaskActiveInputEdit(${id})" type="text"
          placeholder="Add new subtask">
      <div id="subtaskButtons" style="display: flex; align-items: center;">
          <img src="../../assets/img/functionButtons/add.png">
      </div>
  </div>
  <div id="requiredSubtask" class="required v-none"><span>Enter at least 4 letters!</span>
  </div>
  <div id="popupSubtasksEdit" class="subtaskContent"></div>
</div> 
<div class="edit-btn-container">
<button class="btn-blue">Save Task
    <img src="/assets/img/functionButtons/akar-icons_check.png"></button>
</div>     
`;
}

function renderPopupAddTaskTemplateTop() {
  return `
  <div class="section1">
  <div class="titleContainer">
    <div class="enterTitle">
        <input id="taskTitle" type="text" placeholder="Enter a title">
    </div>
    <div id="requiredTitle" class="required v-none">Please enter a title!</div>
  </div>

  <div class="descriptionContainer">
    <div class="descriptionContent">
        <span>Description</span>
        <textarea name="descriptionTextarea" placeholder="Enter a description" id="description"
            cols="30" rows="10"></textarea>
    </div>
    <div id="requiredDescription" class="required v-none">Please enter a description!</div>
  </div>

  <div class="dueDateContainer">
    <div class="dueDate">
        <span>Due date</span>
        <div class="dateContainer" onclick="openCalendar()" >
            <input class="inputGrey" type="date" format="dd/mm/yyyy" placeholder="dd/mm/yyyy" id="datepicker" onfocus="openCalendar();this.showPicker();" autocomplete="off"></input>
            <img src="../../assets/img/board/calendar.png">
        </div>
    </div>
    <div id="requiredDate" class="required v-none">Please enter a date!</div>
  </div>
</div>
`;
}

function renderPopupAddTaskTemplatePriorities() {
  return `
<div class="priorityClass">
  <div class="prioritySection">
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
    <div id="requiredPriority" class="required v-none">Please select an urgency!</div>
  </div>  
</div>
`;
}

function renderPopupAddTaskTemplateAssignedTo() {
  return `
<div class="assignedTo">
  <div class="assignedToContainer">
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
    <div id="requiredAssignedTo" class="required v-none">Please select a contact!</div>
  </div>  
</div>
    `;
}

function renderPopupAddTaskTemplateCategories() {
  return `
<div class="category">
    <div class="categoryContainer">
        <span>Category</span>
        <div id="showCategory" class="selectCategory" onclick="renderCategories()">
            <div id="currentCategory"><span>Select task category</span></div>
            <img src="../../assets/img/functionButtons/selectorArrow.png">
        </div>
        <div id="showNewCategory" class="selectCategory d-none">
            <input id="addNewCategory" type="text" placeholder="New category name" style="font-size: 19px;">
            <img onclick="hideNewCategory()" src="/assets/img/functionButtons/cancelBlue.png">
            <img style="padding-left: 8px; padding-right: 8px;" src="/assets/img/functionButtons/trennstrich.png">
            <img onclick="addNewCategoryFunction()" src="/assets/img/functionButtons/checkedIconSelector.png">
        </div>
        <div class="dropDownContainer">
            <div>
                <div id="colorCircle" class="circle-content d-none">
                    <div id="lightblue" onclick="addCategoryColor('lightblue')" class="colorCircle"
                        style="background: #8AA4FF;"></div>
                    <div id="red" onclick="addCategoryColor('red')" class="colorCircle" style="background: #FF0000;">
                    </div>
                    <div id="green" onclick="addCategoryColor('green')" class="colorCircle"
                        style="background: #2AD300;"></div>
                    <div id="orange" onclick="addCategoryColor('orange')" class="colorCircle"
                        style="background: #FF8A00;"></div>
                    <div id="pink" onclick="addCategoryColor('pink')" class="colorCircle" style="background: #E200BE;">
                    </div>
                    <div id="blue" onclick="addCategoryColor('blue')" class="colorCircle" style="background: #0038FF;">
                    </div>
                </div>
                <div style="max-height: 204px; overflow: auto;" id="selectTaskCategory">
                </div>
            </div>
        </div>
        <div id="requiredCategory" class="required v-none"><span>Please select a category or add a new one!</span>
        </div>
    </div>
</div>
`;
}

function renderPopupAddTaskTemplateSubtasks() {
  return `
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
`;
}

function renderAddTaskMessage() {
  return `
<div class="addedTaskMessage d-none" id="addedTaskMessage">
  <span>Task added to board</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" viewBox="0 0 27 22" fill="none">
      <path
          d="M20.5 1.99979L20.5 19.9998C20.4995 20.5301 20.2886 21.0385 19.9136 21.4134C19.5387 21.7884 19.0303 21.9993 18.5 21.9998L14.5 21.9998C13.9697 21.9993 13.4613 21.7884 13.0864 21.4134C12.7114 21.0385 12.5005 20.5301 12.5 19.9998L12.5 1.99979C12.5005 1.46952 12.7114 0.961118 13.0864 0.58616C13.4613 0.211202 13.9697 0.000317938 14.5 -0.000212328L18.5 -0.000212503C19.0303 0.000317717 19.5387 0.211202 19.9136 0.58616C20.2886 0.961118 20.4995 1.46952 20.5 1.99979ZM14.5 19.9998L18.5 19.9998L18.5 1.99979L14.5 1.99979L14.5 19.9998ZM14.5 1.99979L14.5 19.9998C14.4995 20.5301 14.2886 21.0384 13.9136 21.4134C13.5387 21.7883 13.0303 21.9992 12.5 21.9998L8.5 21.9998C7.96973 21.9992 7.46133 21.7883 7.08637 21.4134C6.71141 21.0384 6.50053 20.53 6.5 19.9998L6.5 1.99977C6.50053 1.4695 6.71141 0.961097 7.08637 0.586139C7.46133 0.211181 7.96973 0.000299127 8.5 -0.000231139L12.5 -0.000231314C13.0303 0.000298906 13.5387 0.211181 13.9136 0.586139C14.2886 0.961097 14.4995 1.46952 14.5 1.99979ZM8.5 19.9998L12.5 19.9998L12.5 1.99979L8.5 1.99977L8.5 19.9998ZM8.5 1.99977L8.5 19.9998C8.49947 20.53 8.28859 21.0384 7.91363 21.4134C7.53867 21.7883 7.03027 21.9992 6.5 21.9998L2.5 21.9998C1.96973 21.9992 1.46133 21.7883 1.08637 21.4134C0.711413 21.0384 0.500529 20.53 0.5 19.9998L0.499999 1.99977C0.500529 1.4695 0.711412 0.961098 1.08637 0.58614C1.46133 0.211182 1.96973 0.000299389 2.5 -0.000230877L6.5 -0.000231051C7.03027 0.000299168 7.53867 0.211181 7.91363 0.586139C8.28859 0.961097 8.49947 1.4695 8.5 1.99977ZM2.5 19.9998L6.5 19.9998L6.5 1.99977L2.5 1.99977L2.5 19.9998Z"
          fill="white" />
      <path
          d="M26.5 2.00001L26.5 20C26.4995 20.5303 26.2886 21.0387 25.9136 21.4136C25.5387 21.7886 25.0303 21.9995 24.5 22L20.5 22C19.9697 21.9995 19.4613 21.7886 19.0864 21.4136C18.7114 21.0387 18.5005 20.5301 18.5 19.9998L18.5 1.99979C18.5005 1.46952 18.7114 0.961339 19.0864 0.586381C19.4613 0.211423 19.9697 0.000540836 20.5 1.05699e-05L24.5 1.0395e-05C25.0303 0.000540615 25.5387 0.211423 25.9136 0.586381C26.2886 0.961339 26.4995 1.46974 26.5 2.00001ZM20.5 19.9998L24.5 20L24.5 2.00001L20.5 1.99979L20.5 19.9998Z"
          fill="white" />
  </svg>
</div>
  `;
}

function renderEditPopupFormTemplate(id, userTask) {
  return `
    <form onsubmit="checkRequiredEdit(${id}); return false;" class="popupTask"
    id="popupTask" onclick="event.stopPropagation()">
    <div style=padding-right:40px; class="closePopupEdit"><img id="closeBtn" onmouseover="closeHover()"
      onmouseleave="closeLeave()" onclick=hidePopup("hidePopupTask()")
      src="../../assets/img/functionButtons/close.png"></div>
    <div class="popupTaskContent" id="popupTaskContent">
      ${renderEditPopupTemplateTop(userTask)}
      ${renderEditPopupTemplatePriorities()}
      ${renderEditPopupTemplateCategories(userTask)}
      ${renderEditPopupTemplateAssignedTo(id)}
      ${renderEditPopupTemplateSubtastks(id)}
    </div>
  </form>
    `;
}
