let tasks = [];

async function addTaskInit(){
    getActiveUserLocal();
    loadUsers();
};



// Show Date
$(function () {
  $("#datepicker").datepicker({
    inline: true,
    changeMonth: true,
    changeYear: true,
  });
});

function renderContactsToAssign(){
    document.getElementById('addTaskContent').innerHTML = `
    
    `
}