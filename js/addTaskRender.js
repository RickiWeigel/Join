function renderContactsToAssign() {
    let contactToAssigned = document.getElementById("contactsToAssign");
    contactToAssigned.classList.remove("d-none");
    renderContactSelectors(contactToAssigned);
    updateCheckboxStatus();
  }

  function renderContactInitialsPopup(contactsArr) {
    console.log(contactsArr);
    const taskContact = document.getElementById(`contactsContainer`);
    taskContact.innerHTML = "";
    for (let j = 0; j < Math.min(contactsArr.length, 2); j++) {
      const newColor = contactsArr[j].color;
      taskContact.innerHTML += `
        <div class="contact box${j}" style="background-color: ${newColor};">
          <span id="contactInitials">${contactsArr[j].initials}</span>
        </div>`;
    }
    if (contactsArr.length > 2) {
      taskContact.innerHTML += `
        <div class="contact boxRest">
          <span id="contactInitials">+${contactsArr.length - 2}</span>
        </div>`;
    }
  }
  
  function renderContactSelectors(contactToAssigned) {
    if (!contactsSelektorOpen) {
      openDropDownContacts(contactToAssigned);
    } else {
      closeDropDownContacts(contactToAssigned);
    }
  }

  function renderCategories() {
    if (!categorySelektorOpen) {
      openDropDownCategories();
    } else {
      closeDropDownCategories();
    }
    const addTaskContent = document.getElementById("addTaskContent");
    addTaskContent.scrollTop += addTaskContent.clientHeight;
  }
  
  function openDropDownCategories() {
    document.getElementById("selectTaskCategory").innerHTML = `
        <div onclick="showNewCategory()" class="dropdown-content"><span>New category</span></div>
    `;
    renderTaskCategories();
    categorySelektorOpen = true;
  }
  
  function closeDropDownCategories() {
    document.getElementById("selectTaskCategory").innerHTML = ``;
    categorySelektorOpen = false;
  }
  
  async function renderTaskCategories() {
    for (let i = 0; i < users[activeUser].taskCategories.length; i++) {
      const category = users[activeUser].taskCategories[i];
      const categoryHTML = categoryHTMLTemplate(category, i);
      document.getElementById("selectTaskCategory").innerHTML += categoryHTML;
    }
  }

  function renderPrioritySelected(priority) {
    prioritySelect = priority;
    let priorityUrgent = document.getElementById("priorityUrgent");
    let priorityMedium = document.getElementById("priorityMedium");
    let priorityLow = document.getElementById("priorityLow");
    switch (prioritySelect) {
      case "Low":
        showPrioritySelectedLow(priorityUrgent, priorityMedium, priorityLow);
        break;
      case "Medium":
        showPrioritySelectedMedium(priorityUrgent, priorityMedium, priorityLow);
        break;
      case "Urgent":
        showPrioritySelectedUrgent(priorityUrgent, priorityMedium, priorityLow);
        break;
    }
  }

  async function renderSubtasks() {
    document.getElementById("addedSubtasks").innerHTML = "";
    for (let i = selectedSubtasks.length - 1; i >= 0; i--) {
      renderSubtasksTemplate(i);
    }
  }

  function showPrioritySelectedLow() {
    priorityUrgent.src = "../../assets/img/addTask/TaskValueHard.png";
    priorityMedium.src = "../../assets/img/addTask/TaskValueMid.png";
    priorityLow.src = "../../assets/img/addTask/TaskValueLowSelected.png";
    priorityLow.classList.remove("priorityLow");
  }
  
  function showPrioritySelectedMedium() {
    priorityUrgent.src = "../../assets/img/addTask/TaskValueHard.png";
    priorityMedium.src = "../../assets/img/addTask/TaskValueMidSelected.png";
    priorityLow.src = "../../assets/img/addTask/TaskValueLow.png";
    priorityMedium.classList.remove("priorityMedium");
  }
  
  function showPrioritySelectedUrgent() {
    priorityUrgent.src = "../../assets/img/addTask/TaskValueHardSelected.png";
    priorityMedium.src = "../../assets/img/addTask/TaskValueMid.png";
    priorityLow.src = "../../assets/img/addTask/TaskValueLow.png";
    priorityUrgent.classList.remove("priorityUrgent");
  }