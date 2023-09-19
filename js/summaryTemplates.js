function greetingTemplate() {
  return `
    <div class="greeting">
        <span>Good morning,</span>
        <span id="greetingGuest">${getFirstName()}</span>
    </div>
    `;
}

function upcomingDeadlineTemplate() {
  return `
<div class="bigInfoBox midInfoBox" onclick="redirectToBoard()">
  <div class="section">
      <div class="boxTop">
          <img class="img" src="../../assets/img/summary/icon_urgent.png">
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
    `;
}

function taskTodoTemplate() {
  return `
    <div class="secondBox midInfoBox boxTop" onclick="redirectToBoard()">
        <div class="section">
            <div class="boxTop">
                <img class="img" src="../../assets/img/summary/icon_board.png">
                <h2 id="">${tasksInTodo}</h2>
            </div>
            <span style="color: #4589FF;">Tasks To-do</span>
        </div>
    </div>
    `;
}

function tasksInBoardTemplate() {
  return `
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
    `;
}

function tasksInProgressTemplate() {
  return `
    <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
        <div class="section">
            <div class="boxTop">
                <img class="img" src="../../assets/img/summary/icon_progress.png">
                <h2 id="">${tasksInProgress}</h2>
            </div>
            <span >Tasks in progress</span>
        </div>
    </div>
    `;
}

function awaitingFeedbackTemplate() {
  return `
   <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
        <div class="section">
            <div class="boxTop">
                <img class="img" src="../../assets/img/summary/icon_feedback.png">
                <h2 id="">${tasksInAwaitFeedback}</h2>
            </div>
            <span >Awaiting feedback</span>
        </div>
    </div>
    `;
}

function tasksDoneTemplate() {
  return `
    <div class="smallInfoBox boxTop" onclick="redirectToBoard()">
        <div class="section">
            <div class="boxTop">
                <img class="img" src="../../assets/img/summary/icon_done.png">
                <h2 id="">${tasksInDone}</h2>
            </div>
            <span >Tasks done</span>
        </div>
    </div>
    `;
}
