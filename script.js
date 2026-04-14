// Клас для моделювання нотатки
class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const saveBtn = document.getElementById('saveBtn');
const notesContainer = document.getElementById('notesContainer');
const adviceBox = document.getElementById('advice');

let notes = JSON.parse(localStorage.getItem('notes_storage')) || [];
let editId = null;

// Функція використання API для підвантаження поради
async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        adviceBox.innerText = `Порада дня: ${data.slip.advice}`;
    } catch (error) {
        adviceBox.innerText = "Порада: Завжди пишіть чистий код!";
    }
}

function render() {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note';
        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <div class="btn-group">
                <button class="edit-btn" onclick="prepareEdit(${note.id})">Редагувати</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Видалити</button>
            </div>
        `;
        notesContainer.appendChild(div);
    });
}

function handleSave() {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    
    if (!title || !text) return;

    if (editId) {
        const index = notes.findIndex(n => n.id === editId);
        notes[index].title = title;
        notes[index].text = text;
        editId = null;
        saveBtn.innerText = 'Зберегти нотатку';
        saveBtn.style.background = '#28a745';
    } else {
        const newNote = new Note(Date.now(), title, text);
        notes.push(newNote);
    }

    localStorage.setItem('notes_storage', JSON.stringify(notes));
    noteTitle.value = '';
    noteText.value = '';
    render();
}

window.deleteNote = (id) => {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('notes_storage', JSON.stringify(notes));
    render();
};

window.prepareEdit = (id) => {
    const note = notes.find(n => n.id === id);
    noteTitle.value = note.title;
    noteText.value = note.text;
    editId = id;
    saveBtn.innerText = 'Оновити нотатку';
    saveBtn.style.background = '#17a2b8';
    noteTitle.focus();
};

saveBtn.addEventListener('click', handleSave);
fetchAdvice();
render();