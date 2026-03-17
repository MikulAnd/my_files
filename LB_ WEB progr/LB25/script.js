// 1. Фаза захоплення (true як третій параметр)
document.getElementById('outer').addEventListener('click', () => {
    console.log('Захоплення: Outer DIV');
}, true);

document.getElementById('inner').addEventListener('click', () => {
    console.log('Захоплення: Inner DIV');
}, true);

// 2. Цільова фаза та 3. Всплиття
const btn = document.getElementById('btn');

btn.addEventListener('click', (event) => {
    console.log('Ціль: Кнопка натиснута');
    // 4. Зупинка всплиття (за потреби)
    // event.stopPropagation(); 
});

document.getElementById('inner').addEventListener('click', () => {
    console.log('Всплиття: Inner DIV');
});

document.getElementById('outer').addEventListener('click', () => {
    console.log('Всплиття: Outer DIV');
});

// 5. Зупинка всіх обробників (stopImmediatePropagation)
btn.addEventListener('click', (event) => {
    console.log('Перший обробник кнопки');
    // event.stopImmediatePropagation(); // зупинить наступний обробник
});

btn.addEventListener('click', () => {
    console.log('Другий обробник кнопки');
});

// 6. Делегування подій
document.getElementById('menu').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log('Делегування: Натиснуто на ' + event.target.textContent);
    }
});