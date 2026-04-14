class Note {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

const noteInput = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes_data')) || [];
let editId = null; 

function render() {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <div class="note-text">${note.text}</div>
            <div class="btn-group">
                <button class="edit-btn" onclick="prepareEdit(${note.id})">Редагувати</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Видалити</button>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function handleSave() {
    const text = noteInput.value.trim();
    if (!text) return;

    if (editId) {
        const index = notes.findIndex(n => n.id === editId);
        notes[index].text = text;
        editId = null;
        saveBtn.innerText = 'Зберегти нотатку';
    } else {
        const newNote = new Note(Date.now(), text);
        notes.push(newNote);
    }

    localStorage.setItem('notes_data', JSON.stringify(notes));
    noteInput.value = '';
    render();
}

window.deleteNote = (id) => {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('notes_data', JSON.stringify(notes));
    render();
};

window.prepareEdit = (id) => {
    const note = notes.find(n => n.id === id);
    noteInput.value = note.text;
    editId = id;
    saveBtn.innerText = 'Оновити нотатку';
    noteInput.focus();
};

saveBtn.addEventListener('click', handleSave);
render();