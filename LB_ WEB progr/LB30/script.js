// --- ЧАСТИНА 1. КЛІЄНТСЬКА ПАГІНАЦІЯ ---
const clientData = Array.from({ length: 50 }, (_, i) => `Елемент ${i + 1}`);
const itemsPerPage = 5;
let currentPage = 1;

function displayClientPage(page) {
    const listElement = document.getElementById('client-list');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = clientData.slice(start, end);

    listElement.innerHTML = pageItems.map(item => `<div class="item">${item}</div>`).join('');
    document.getElementById('pageIndicator').textContent = `Сторінка ${page}`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayClientPage(currentPage);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < Math.ceil(clientData.length / itemsPerPage)) {
        currentPage++;
        displayClientPage(currentPage);
    }
});

// --- ЧАСТИНА 2. ІНФІНІТНА ПРОКРУТКА (СЕРВЕРНА) ---
let serverPage = 1;
let isFetching = false;

async function loadMoreData() {
    if (isFetching) return;
    isFetching = true;
    
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${serverPage}&_limit=5`);
        const data = await response.json();

        const serverList = document.getElementById('server-list');
        data.forEach(item => {
            const element = document.createElement('div');
            element.className = 'item';
            element.innerHTML = `<strong>ID: ${item.id}</strong> — ${item.title}`;
            serverList.appendChild(element);
        });

        serverPage++;
    } catch (error) {
        console.error("Помилка завантаження:", error);
    } finally {
        isFetching = false;
        loader.style.display = 'none';
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreData();
    }
});

// Ініціалізація
displayClientPage(1);
loadMoreData();