// --- Частина 1. Throttle (Обмеження частоти) ---
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const statusDisplay = document.getElementById('status');
window.addEventListener('scroll', throttle(() => {
    statusDisplay.textContent = `${window.scrollY}px`;
    console.log(`Тротлінг: Прокручено ${window.scrollY}px`);
}, 300));

// --- Частина 2. Debounce (Затримка виконання) ---
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    }
}

const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce(() => {
    console.log(`Дебаунс: Пошук запиту "${searchInput.value}"`);
}, 500));

// --- Частина 3. Lazy Load (Intersection Observer) ---
const images = document.querySelectorAll('img[data-src]');

const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.removeAttribute('data-src');
            observer.unobserve(img);
            console.log("LazyLoad: Зображення завантажено");
        }
    });
};

const imgObserver = new IntersectionObserver(lazyLoad, {
    rootMargin: "0px 0px 50px 0px",
    threshold: 0.1
});

images.forEach(img => imgObserver.observe(img));