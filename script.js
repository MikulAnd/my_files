// Клас для моделювання нотатки (ООП)
class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const searchInput = document.getElementById('searchInput');
const saveBtn = document.getElementById('saveBtn');
const notesContainer = document.getElementById('notesContainer');
const adviceBox = document.getElementById('advice');

let notes = JSON.parse(localStorage.getItem('notes_storage')) || [];
let editId = null;

// Отримання поради та її переклад на українську
async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const englishAdvice = data.slip.advice;

        const translateRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishAdvice)}&langpair=en|uk`);
        const translateData = await translateRes.json();
        adviceBox.innerText = `Порада дня: ${translateData.responseData.translatedText}`;
    } catch (error) {
        adviceBox.innerText = "Порада: Завжди пишіть чистий код!";
    }
}

// Рендеринг списку з фільтрацією
function render(filter = '') {
    notesContainer.innerHTML = '';
    
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(filter.toLowerCase()) || 
        note.text.toLowerCase().includes(filter.toLowerCase())
    );

    filteredNotes.forEach(note => {
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

// Збереження або Оновлення
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
        notes.push(new Note(Date.now(), title, text));
    }

    syncStorage();
    noteTitle.value = '';
    noteText.value = '';
    render(searchInput.value);
}

window.deleteNote = (id) => {
    notes = notes.filter(n => n.id !== id);
    syncStorage();
    render(searchInput.value);
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

function syncStorage() {
    localStorage.setItem('notes_storage', JSON.stringify(notes));
}

// Пошук в реальному часі
searchInput.addEventListener('input', (e) => {
    render(e.target.value);
});

saveBtn.addEventListener('click', handleSave);

fetchAdvice();
render();