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
    <div class="categoryHeadline" style="background: ${userTask.category.color};">
        <span>${userTask.category.name}</span>
    </div>
    <div class="taskHeadline">
        <span>${userTask.taskTitle}</span>
    </div>
    <span class="boxDescription">${userTask.taskDescription}</span>
    <div class="progressStatus">
        <div class="progress">
          <div class="progressCompleted" style="width: ${completedProgress}%;"></div>
        </div>
        <span>${completedTasks}/${subtaskLength} Done</span>
    </div>
    <div class="taskFooter">
        <div class="taskContacts" id="taskContacts${id}">
        </div>
        <div class="taskPriority"><img src="${priorityImageUrl}"></div>
    </div>
</div>
    `;
}
