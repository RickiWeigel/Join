function categoryHTMLTemplate(category, i) {
  return `
<div onclick="setSelectedCategory('${i}')" class="dropdown-content" 
  onmouseover="categoryHover(${i})" onmouseleave="categoryLeave(${i})">
  <div class="dropdown-content-left">
    <span>${category.name}</span>
    <div class="colorCircle" style="background: ${category.color};"></div>
  </div>
  <img class="delete-btn d-none" id="categoryDeleteBtn-${i}" 
    onclick="deleteCategory(${i}, event)" src="../../assets/img/functionButtons/delete.png">
</div>
`;
}

function resetSubtaskActiveInput() {
  return `
  <img onclick="clearSubtaskInput()"
  src="/assets/img/functionButtons/cancelBlue.png">
    <img style="padding-left: 8px; padding-right: 8px;"
  src="/assets/img/functionButtons/trennstrich.png">
<img onclick="addNewSubTasks()" src="/assets/img/functionButtons/checkedIconSelector.png">
`;
}

function showCurrentCategory(selectedCategory) {
  return `
  <div id="currentCategory">
    <span>${selectedCategory.name}</span>
    <div class="colorCircle" style="background: ${selectedCategory.color};"></div>
  </div>
  <img src="../../assets/img/functionButtons/selectorArrow.png"> 
  `;
}

function renderPopupAddTaskTemplate() {
  return `
  <div class="popupAddTask" id="popupAddTask" onclick="event.stopPropagation()">
  <div class="titleAddTask">Add Task</div>
  <form onsubmit="addTaskPopup(); return false;" class="addTaskForm" id="addTaskForm" onclick="closeDropdown()">
      <div  class="boardAddTaskContent" id="addTaskContent">
        <div class="boardAddTaskSection" id="boardAddTaskSection">
          ${renderPopupAddTaskTemplateTop()}
          ${renderPopupAddTaskTemplatePriorities()}
          ${renderPopupAddTaskTemplateAssignedTo()}
          ${renderPopupAddTaskTemplateCategories()}
          ${renderPopupAddTaskTemplateSubtasks()}   
          <button form="addTaskForm" class="btn-blue btn-blue-AddTask">Creat Task <img src="/assets/img/functionButtons/akar-icons_check.png"></button>
        </div>
      </div>
  </form>
  <div class="close-btn" onclick="hidePopup('hidePopupTask()')">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9.00007 10.8642L2.46673 17.389C2.22229 17.6331 1.91118 17.7552 1.5334 17.7552C1.15562 17.7552 0.84451 17.6331 0.600065 17.389C0.355621 17.1449 0.233398 16.8342 0.233398 16.4569C0.233398 16.0796 0.355621 15.7689 0.600065 15.5248L7.1334 9.00002L0.600065 2.47527C0.355621 2.23115 0.233398 1.92045 0.233398 1.54316C0.233398 1.16588 0.355621 0.855181 0.600065 0.611058C0.84451 0.366935 1.15562 0.244873 1.5334 0.244873C1.91118 0.244873 2.22229 0.366935 2.46673 0.611058L9.00007 7.13581L15.5334 0.611058C15.7778 0.366935 16.089 0.244873 16.4667 0.244873C16.8445 0.244873 17.1556 0.366935 17.4001 0.611058C17.6445 0.855181 17.7667 1.16588 17.7667 1.54316C17.7667 1.92045 17.6445 2.23115 17.4001 2.47527L10.8667 9.00002L17.4001 15.5248C17.6445 15.7689 17.7667 16.0796 17.7667 16.4569C17.7667 16.8342 17.6445 17.1449 17.4001 17.389C17.1556 17.6331 16.8445 17.7552 16.4667 17.7552C16.089 17.7552 15.7778 17.6331 15.5334 17.389L9.00007 10.8642Z" fill="#4589FF"/>
  </svg>
</div>
</div>
${renderAddTaskMessage()}
  `;
}

function renderShowCategory() {
  document.getElementById("showCategory").innerHTML = `
    <div id="currentCategory"><span>Select task category</span></div>
    <img src="../../assets/img/functionButtons/selectorArrow.png"> 
  `;
}

function renderSubtasksTemplate(i) {
  document.getElementById("addedSubtasks").innerHTML += `
  <div onclick="addToSelectedSubtasks(${i})" class="subtasks">
      <img id="checkbox[${i}]" src="../../assets/img/functionButtons/checkboxActive.png">
      <span id="subtasks">${selectedSubtasks[i]}</span>
  </div>
`;
}
