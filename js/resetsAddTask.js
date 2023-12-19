function resetCategoryRendering() {
  document.getElementById("showCategory").innerHTML = `
    <div id="currentCategory">
      <span>Select task category</span>
    </div>
    <img src="../../assets/img/functionButtons/selectorArrow.png"> 
  `;
}

function resetAllFields() {
  resetAllVariables();
  resetAllInputs();
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

function resetRequiredMessage() {
  let requiredMessage = document.getElementById("requiredCategory");
  requiredMessage.innerHTML = `
        <span>Please select a category or add a new one!</span>
      `;
  requiredMessage.classList.add("v-none");
}
