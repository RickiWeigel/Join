let tasks = [];

async function addTaskInit(){
    getActiveUserLocal();
    loadUsers();
};



function getActiveUserLocal() {
    let activeUser = localStorage.getItem('activeUser');
    return activeUser;
}


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