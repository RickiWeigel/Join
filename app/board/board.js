async function boardInit() {
  mainInit();
}

let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let done = [];

function groupTasksByProgressStatus(user) {
  toDo = [];
  inProgress = [];
  awaitFeedback = [];
  done = [];
  let userTasks = user.userTasks;
  for (let i = 0; i < userTasks.length; i++) {
    let task = userTasks[i];
    sortProgress(task);
  }
  return {
    toDo,
    inProgress,
    awaitFeedback,
    done,
  };
}

function sortProgress(task) {
  switch (task.progressStatus) {
    case "toDo":
      toDo.push(task);
      break;
    case "inProgress":
      inProgress.push(task);
      break;
    case "awaitFeedback":
      awaitFeedback.push(task);
      break;
    case "done":
      done.push(task);
      break;
  }
}
