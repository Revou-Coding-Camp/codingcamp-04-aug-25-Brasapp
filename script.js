const inputBox = document.getElementById("inputBox");
const dateBox = document.getElementById("dateBox");
const taskList = document.getElementById("task-list");

function addTask() {
    const taskText = inputBox.value;
    const dueDate = dateBox.value;

    if (inputBox.value === "") {
        alert("Please enter a task.");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = `${taskText} <span class="date">${dueDate}</span>`;
        taskList.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    dateBox.value = "";
    saveData();
}

taskList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    if (e.target.tagName === "SPAN" && e.target.className !== "date") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function deleteAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    saveData();
}

function saveData(){
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadData(){
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        taskList.innerHTML = tasks;
    }
}

function filterTasks() {
    const tasks = taskList.getElementsByTagName("li");
    for (let task of tasks) {
        if (!task.classList.contains("checked")) {
            task.style.display = "none";
        } else {
            task.style.display = "";
        }
    }
}

function showAllTasks() {
    const tasks = taskList.getElementsByTagName("li");
    for (let task of tasks) {
        task.style.display = "";
    }
}

loadData();