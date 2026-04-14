// 1. Простий проміс (3 секунди)
const simplePromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Операція завершена успішно');
    }, 3000);
});

simplePromise.then((message) => console.log("Завдання 1:", message));

// 2. Проміс із випадковим відхиленням
const randomPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
        if (success) {
            resolve('Успіх: Дані отримано');
        } else {
            reject('Помилка: З’єднання розірвано');
        }
    }, 1500);
});

randomPromise
    .then((res) => console.log("Завдання 2:", res))
    .catch((err) => console.error("Завдання 2:", err));

// 3. Паралельні запити (Promise.all)
async function fetchParallel() {
    try {
        const [res1, res2] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts/2').then(r => r.json())
        ]);
        console.log('Завдання 3 (Паралельні запити):', { res1, res2 });
    } catch (error) {
        console.error('Помилка у Promise.all:', error);
    }
}
fetchParallel();

// 4. Async/await та виведення УКРАЇНСЬКОЮ на сторінку
async function renderData() {
    const container = document.getElementById('post-container');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) throw new Error('Сервер не відповідає');
        
        const post = await response.json();
        
        // ВИПРАВЛЕННЯ: Замінюємо англійський текст із сервера на український
        const ukrTitle = "Назва поста: " + post.title.substring(0, 10) ;
        const ukrBody = "Це приклад асинхронного завантаження даних. Сервер успішно повернув пост №" + post.id + ", і ми відобразили його українською мовою для лабораторної роботи.";

        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3 style="margin: 0; color: #333;">${ukrTitle}</h3>
            <p style="color: #666; line-height: 1.5;">${ukrBody}</p>
        `;
        
        container.innerHTML = ''; // Прибираємо напис "Завантаження..."
        container.appendChild(postDiv);
        
    } catch (error) {
        console.error('Помилка:', error);
        container.innerText = 'Не вдалося завантажити дані.';
    }
}
renderData();