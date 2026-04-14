// 1. Клас для моделювання нотатки (ООП)
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

// Завантаження даних з LocalStorage
let notes = JSON.parse(localStorage.getItem('notes_storage')) || [];
let editId = null;

// 2. Робота з API (Порада дня з перекладом)
async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const englishAdvice = data.slip.advice;

        // Переклад на українську через MyMemory API
        const translateRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishAdvice)}&langpair=en|uk`);
        const translateData = await translateRes.json();
        const ukrainianAdvice = translateData.responseData.translatedText;

        adviceBox.innerText = `Порада дня: ${ukrainianAdvice}`;
    } catch (error) {
        adviceBox.innerText = "Порада: Завжди пишіть чистий та зрозумілий код!";
    }
}

// 3. Відображення нотаток
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

// 4. Збереження / Редагування
function handleSave() {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    
    if (!title || !text) {
        alert("Заповніть, будь ласка, всі поля!");
        return;
    }

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

    syncStorage();
    noteTitle.value = '';
    noteText.value = '';
    render();
}

window.deleteNote = (id) => {
    notes = notes.filter(n => n.id !== id);
    syncStorage();
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

function syncStorage() {
    localStorage.setItem('notes_storage', JSON.stringify(notes));
}

saveBtn.addEventListener('click', handleSave);

// Початковий запуск
fetchAdvice();
render();