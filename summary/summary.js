async function summaryInit() {
  await mainInit();
  highlightedNavbar(1);
  renderSummaryContent();
  countTasksByProgressStatus();
}

async function renderSummaryContent() {
  countTasksByProgressStatus();
  document.getElementById("contentSummary").innerHTML = `
    <div class="greeting">
        <span>Good morning,</span>
        <span id="greetingGuest">${getFirstName()}</span>
    </div>

    <div class="information">
        <div class="bigInfoBox midInfoBox" onclick="redirectToBoard()">
            <div class="section">
                <div class="boxTop">
                    <img class="img" src="../../assets/img/summary/icon_urgent.png"
                        >
                    <h2 id="TasksUrgent">${countUrgentTasks()}</h2>
                </div>
                <span>Tasks Urgent</span>
            </div>
            <div class="midLine"></div>
            <div class="rightSection">
                <span id="upcomingDate">${findClosestDueDate(
                  users[activeUser].userTasks
                )}</span>
                <span>Upcoming Deadline</span>
            </div>
        </div>

        <div class="secondBox midInfoBox boxTop" onclick="redirectToBoard()">
            <div class="section">
                <div class="boxTop">
                    <img class="img" src="../../assets/img/summary/icon_board.png">
                    <h2 id="">${tasksInTodo}</h2>
                </div>
                <span style="color: #4589FF;">Tasks To-do</span>
            </div>
        </div>

        <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
            <div class="section">
                <div class="boxTop">
                    <img class="img" src="../../assets/img/summary/icon_board.png">
                    <h2 id="">${
                      tasksInTodo +
                      tasksInProgress +
                      tasksInAwaitFeedback +
                      tasksInDone
                    }</h2>
                </div>
                <span>Tasks in Board</span>
            </div>
        </div>

        <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
            <div class="section">
                <div class="boxTop">
                    <img class="img" src="../../assets/img/summary/icon_progress.png">
                    <h2 id="">${tasksInProgress}</h2>
                </div>
                <span >Tasks in progress</span>
            </div>
        </div>

        <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
            <div class="section">
                <div class="boxTop">
                    <img class="img" src="../../assets/img/summary/icon_feedback.png">
                    <h2 id="">${tasksInAwaitFeedback}</h2>
                </div>
                <span >Awaiting feedback</span>
            </div>
        </div>

        <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
            <div class="section">
                <div class="boxTop">
                    <img class="img" src="../../assets/img/summary/icon_done.png">
                    <h2 id="">${tasksInDone}</h2>
                </div>
                <span >Tasks done</span>
            </div>
        </div>
    </div>
    `;
}

function countTasksByProgressStatus() {
  const userTasks = users[activeUser].userTasks;

  // Filtern Sie die Tasks nach progressStatus
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
