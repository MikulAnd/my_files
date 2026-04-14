// Клас для створення об'єкта завдання
class Task {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Отримуємо збережені дані або створюємо порожній масив
let tasks = JSON.parse(localStorage.getItem('user_tasks')) || [];

function render() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
        `;
        taskList.appendChild(item);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = new Task(Date.now(), text);
    tasks.push(newTask);
    saveData();
    taskInput.value = '';
    render();
}

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveData();
    render();
};

function saveData() {
    localStorage.setItem('user_tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', addTask);

// Перший запуск
render();