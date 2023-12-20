function allowDrop(ev) {
    ev.preventDefault();
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