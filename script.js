document.addEventListener('DOMContentLoaded', function() {
    showTask();
    updateTaskCount();
    
    // Add task on Enter key press
    document.getElementById("input-box").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const taskText = inputBox.value.trim();

    if (taskText === '') {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <span class="delete-btn">×</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
    updateTaskCount();

    // Add event listeners for the new task
    li.addEventListener('click', function() {
        this.classList.toggle("checked");
        saveData();
        updateTaskCount();
    });

    li.querySelector(".delete-btn").addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm("Delete this task?")) {
            li.remove();
            saveData();
            updateTaskCount();
        }
    });
}

function clearCompleted() {
    const completedTasks = document.querySelectorAll("#list-container li.checked");
    if (completedTasks.length === 0) return;
    
    if (confirm(`Clear ${completedTasks.length} completed task(s)?`)) {
        completedTasks.forEach(task => task.remove());
        saveData();
        updateTaskCount();
    }
}

function saveData() {
    const listContainer = document.getElementById("list-container");
    localStorage.setItem("todo-data", listContainer.innerHTML);
}

function showTask() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = localStorage.getItem("todo-data") || "";

    // Re-attach event listeners to all tasks
    document.querySelectorAll("#list-container li").forEach(li => {
        li.addEventListener('click', function() {
            this.classList.toggle("checked");
            saveData();
            updateTaskCount();
        });

        const deleteBtn = li.querySelector(".delete-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (confirm("Delete this task?")) {
                    li.remove();
                    saveData();
                    updateTaskCount();
                }
            });
        }
    });
}

function updateTaskCount() {
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const completedTasks = document.querySelectorAll("#list-container li.checked").length;
    const taskCountElement = document.getElementById("task-count");
    
    taskCountElement.textContent = 
        `${totalTasks} task${totalTasks !== 1 ? 's' : ''}` + 
        (completedTasks > 0 ? ` (${completedTasks} completed)` : '');
}