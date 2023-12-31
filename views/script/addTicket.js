const addTicketForm = document.getElementById('add-ticket-popup-form');
const ticketName = document.getElementById('ticket-name');
const ticketStatusEl = document.getElementById('status');
const priority = document.getElementById('priority');
const createdBy = document.getElementById('created-by');
const targetEndDate = document.getElementById('target-end-date');
const addAssigneeButton = document.getElementById('add-assignee-button');
const assigneesContainer = document.getElementById('assignees-container');
//const projectId = document.getElementById('project-id');
//const Project = require('../models/project');

function openAddTicketForm() {
    document.getElementById("add-ticket-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("add-ticket-popup").style.display = "none";
}

addTicketForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const formData = new FormData(addTicketForm);

    const assignees = Array.from(formData.getAll('assignees[]'));

    const ticketData = Object.fromEntries(formData);
    ticketData.assignees = assignees;

    /*const createdOn = Date.now();
    const startDate = new Date(ticketData.startDate);
    const targetEndDate = new Date(ticketData.targetEndDate);
    const actualEndDate = new Date(ticketData.actualEndDate);

    var messages = [];

    if (createdOn > targetEndDate && createdOn > actualEndDate) {
            messages.push("Target-end date and actual-end date must be after the current date");
    }

    if (targetEndDate >= actualEndDate) {
            messages.push("Target-end date must be before or equal to actual-end date");
    }

    if (startDate > targetEndDate || startDate > actualEndDate) {
            messages.push("Target-end date and actual-end date must be after the start date");
    }*/

    const pathSegments = window.location.pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    //const project = await Project.findById(projectId);

    //const participants = project.employees;

    //const assigneesExistInProject = assignees.filter((assignee) => !participants.includes(assignee));
      
    /*if(assigneesExistInProject.length > 0) {
        messages.push(`These users: ${assigneesExistInProject.join(', ')} are not part of this project.`);
    }*/


    // Send a POST request to save the form data
    //if(messages.length === 0) {
        fetch(`/project_dashboard/${projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })
        .then(response => response.json())
        .then(() => visualizeTicket())
        .then(() => closeForm())
        .then(() => location.reload())
        .catch(error => {
            location.reload();
            console.error('Error saving the form data:', error);
        });
    //}
});

function visualizeTicket() {
    const ticketLi = document.createElement('li');
    const ticketDiv = document.createElement('div');
    ticketDiv.setAttribute('class', 'ticket-visualize');

    const ticketInfoForm = document.createElement('form');
    ticketInfoForm.setAttribute('id', 'ticket-info-form');
    ticketInfoForm.setAttribute('action', '/ticket_info');
    ticketInfoForm.setAttribute('method', 'post');

    const btnTicketInfo = document.createElement('button');
    btnTicketInfo.setAttribute('class', 'button');
    btnTicketInfo.setAttribute('id', 'ticket-info-button');
    btnTicketInfo.setAttribute('type', 'submit');
    btnTicketInfo.textContent = 'Ticket info';

    const divTicketInfoAPart1 = document.createElement('div');
    divTicketInfoAPart1.setAttribute('id', 'ticket-info-form-a-part');

    const divTicketInfoAPart2 = document.createElement('div');
    divTicketInfoAPart2.setAttribute('id', 'ticket-info-form-a-part');

    const ticketTitle = document.createElement('span');
    ticketTitle.textContent = "Ticket name: ";

    const strongTicketName = document.createElement('strong');
    strongTicketName.textContent = ticketName.value;

    ticketTitle.appendChild(strongTicketName);

    const ticketPriority = document.createElement('span');
    ticketPriority.setAttribute('class', 'priority');
    
    const strongPriority = document.createElement('strong');
    strongPriority.textContent = priority.value;

    ticketPriority.appendChild(strongPriority);

    const ticketTargetEndDate = document.createElement('span');
    ticketTargetEndDate.textContent = "Target end-date: ";

    const strongTargetEndDate = document.createElement('strong');
    strongTargetEndDate.textContent = targetEndDate.value;

    ticketTargetEndDate.appendChild(strongTargetEndDate);

    divTicketInfoAPart1.appendChild(ticketTitle);
    divTicketInfoAPart1.append(document.createElement('br'));
    divTicketInfoAPart1.append(ticketPriority);
    divTicketInfoAPart1.append(document.createElement('br'));
    divTicketInfoAPart1.append(ticketTargetEndDate);
    divTicketInfoAPart1.append(document.createElement('br'));

    ticketInfoForm.appendChild(divTicketInfoAPart1);

    divTicketInfoAPart2.appendChild(btnTicketInfo);

    ticketInfoForm.appendChild(divTicketInfoAPart2);

    ticketDiv.appendChild(ticketInfoForm);
    ticketLi.appendChild(ticketDiv);

    const ticketStatus = ticketStatusEl.value;


    if (ticketStatus === 'Open') {
        const openUl = document.querySelector('#open');
        openUl.appendChild(ticketLi);
    } 
    else if (ticketStatus === 'In Progress') {
        const inProgressUl = document.querySelector('#in-progress');
        inProgressUl.appendChild(ticketLi);
    } 
    else if (ticketStatus === 'Cancelled') {
        const cancelledUl = document.querySelector('#cancelled');
        cancelledUl.appendChild(ticketLi);
    } 
    else if (ticketStatus === 'Done') {
        const doneUl = document.querySelector('#done');
        doneUl.appendChild(ticketLi);
    }

    closeForm();

    //location.reload();

    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    let assigneeCount = 1;
  
    addAssigneeButton.addEventListener("click", function() {
      assigneeCount++;
  
      const newAssigneeField = document.createElement("div");

      newAssigneeField.className = "assignees-field";
      newAssigneeField.innerHTML = `
        <input type="text" id="assignees" name="assignees[]" placeholder="Enter assignee's username" required>
        <button type="button" class="remove-assignee-button">-</button>`;
  
      assigneesContainer.appendChild(newAssigneeField);
    });
  
    assigneesContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("remove-assignee-button")) {
        event.target.parentNode.remove();
      }
    });
  });