// 1. Робота з LocalStorage (Збереження теми)
const themeBtn = document.getElementById('themeButton');
const savedTheme = localStorage.getItem('theme') || 'light';

// Встановлюємо збережену тему при завантаженні [cite: 668]
document.body.className = savedTheme;

themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Зберігаємо вибір користувача назавжди [cite: 676]
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
    console.log(`Тему змінено на: ${newTheme}`);
});

// 2. Робота з SessionStorage (Дані форми)
const userForm = document.getElementById('userForm');

// Зберігаємо дані при введенні через JSON [cite: 683-690]
userForm.addEventListener('input', () => {
    const formData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value
    };
    sessionStorage.setItem('tempFormData', JSON.stringify(formData));
});

// Відновлюємо дані при оновленні сторінки [cite: 692-700]
window.addEventListener('load', () => {
    const savedData = sessionStorage.getItem('tempFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('userName').value = data.name || '';
        document.getElementById('userEmail').value = data.email || '';
        console.log("Дані сесії відновлено");
    }
});