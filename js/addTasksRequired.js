function checkRequiredField(valueToCheck, requiredMessageId) {
    let requiredMessage = document.getElementById(requiredMessageId);
    if (!valueToCheck || (Array.isArray(valueToCheck) && valueToCheck.length === 0)) {
      requiredMessage.classList.remove("v-none");
      return true;
    }
    return false;
  }
  
  function hideRequiredFields() {
    const fieldIds = ["requiredTitle", "requiredDescription", "requiredDate", "requiredPriority", "requiredAssignedTo", "requiredCategory"];
    fieldIds.forEach((fieldId) => {
      const element = document.getElementById(fieldId);
      element.classList.add("v-none");
    });
  }
  
  async function checkRequired() {
    hideRequiredFields();
    let taskTitle = document.getElementById("taskTitle").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("datepicker").value;
    const titleRequired = checkRequiredField(taskTitle, "requiredTitle");
    const descriptionRequired = checkRequiredField(description, "requiredDescription");
    const dateRequired = checkRequiredField(date, "requiredDate");
    const priorityRequired = checkRequiredField(prioritySelect, "requiredPriority");
    const assignedToRequired = checkRequiredField(selectedContactsToAssign, "requiredAssignedTo");
    const categoryRequired = checkRequiredField(selectedCategory.name, "requiredCategory");
    return !titleRequired && !descriptionRequired && !dateRequired && !priorityRequired && !assignedToRequired && !categoryRequired;
  }
  
  async function requiredAddTask() {
    const requiredFieldsValid = await checkRequired();
    if (requiredFieldsValid) {
      addTask();
    }
  }