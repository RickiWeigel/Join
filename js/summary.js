async function summaryInit() {
  await mainInit();
  highlightedNavbar(1);
  renderSummaryContent();
  countTasksByProgressStatus();
}

async function renderSummaryContent() {
  let contentSummary = document.getElementById("contentSummary");
  countTasksByProgressStatus();

  contentSummary.innerHTML = `
    ${greetingTemplate()}
    
    <div class="information">
      ${upcomingDeadlineTemplate()}
      ${taskTodoTemplate()}
      ${tasksInBoardTemplate()}
      ${tasksInProgressTemplate()}
      ${awaitingFeedbackTemplate()}
      ${tasksDoneTemplate()}
    </div>
    `;
}

function countTasksByProgressStatus() {
  const userTasks = users[activeUser].userTasks;

  tasksInTodo = userTasks.filter(
    (task) => task.progressStatus === "toDo"
  ).length;
  tasksInProgress = userTasks.filter(
    (task) => task.progressStatus === "inProgress"
  ).length;
  tasksInAwaitFeedback = userTasks.filter(
    (task) => task.progressStatus === "awaitFeedback"
  ).length;
  tasksInDone = userTasks.filter(
    (task) => task.progressStatus === "done"
  ).length;
}

function countUrgentTasks() {
  const userTasks = users[activeUser].userTasks;

  // Filtern Sie die Tasks nach priority
  const counterUrgentTasks = userTasks.filter(
    (task) => task.priority === "Urgent"
  ).length;

  // Geben Sie die Anzahl der Tasks mit priority: "Urgent" zurück
  return counterUrgentTasks;
}

function getFirstName() {
  const words = users[activeUser].name.split(" "); // Aufteilen des Namens anhand von Leerzeichen
  if (words.length > 0) {
    return words[0]; // Das erste Wort zurückgeben
  }
}

function findClosestDueDate(userTasks) {
  if (userTasks.length === 0) {
    return "-"; // Rückgabe null, wenn keine Aufgaben vorhanden sind
  }

  const currentDate = new Date(); // Aktuelles Datum
  let closestDueDate = new Date(userTasks[0].toDueDate); // Das erste ToDueDate als Ausgangspunkt

  // Iteriere durch alle Aufgaben, um das nächstgelegene ToDueDate zu finden
  for (const task of userTasks) {
    const taskDueDate = new Date(task.toDueDate);

    // Überprüfe, ob das aktuelle ToDueDate näher am aktuellen Datum liegt
    if (taskDueDate > currentDate && taskDueDate < closestDueDate) {
      closestDueDate = taskDueDate;
    }
  }

  // Formatieren und zurückgeben des nächstgelegenen ToDueDate
  const year = closestDueDate.getFullYear();
  const month = (closestDueDate.getMonth() + 1).toString().padStart(2, "0");
  const day = closestDueDate.getDate().toString().padStart(2, "0");
  return formatDate(day, month, year);
}

function formatDate(day, month, year) {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  month = months[month - 1]; // Monatsnamen aus dem Array holen
  return `${month} ${day}, ${year}`;
}
