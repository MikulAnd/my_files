const taskList = document.getElementById('task-list');
const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-task');

addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    
    if (taskText === "") return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Виконано';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Видалити';

    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    removeBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(doneBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    input.value = '';
    input.focus();
});

// Додавання завдання через клавішу Enter
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});