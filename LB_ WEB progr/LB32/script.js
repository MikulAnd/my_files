// Імпортуємо функції та дефолтну константу
import devName, { add, multiply } from './utils.js';

console.log(`Розробник: ${devName}`);

const x = 10, y = 5;
console.log(`${x} + ${y} = ${add(x, y)}`);
console.log(`${x} * ${y} = ${multiply(x, y)}`);

// Приклад використання модулів для роботи з даними
async function showModuleData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log("Дані завантажені модулем:", data.title);
}
showModuleData();