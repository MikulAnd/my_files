// Завдання 1. Класифікація віку (if / else if / else)
let ageInput = prompt("Введіть ваш вік:");
let age = Number(ageInput);

if (age < 7) {
    console.log("Результат: Дитина");
} else if (age >= 12 && age <= 16) {
    console.log("Результат: Підліток");
} else if (age >= 25) {
    console.log("Результат: Дорослий");
} else {
    console.log("Результат: Інша вікова категорія");
}

// Завдання 2. Робота з днями тижня (switch)
let day = prompt("Введіть день тижня:").toLowerCase();

switch (day) {
    case "понеділок":
        console.log("Повідомлення: Початок тижня");
        break;
    case "п'ятниця":
        console.log("Повідомлення: Майже вихідні");
        break;
    case "неділя":
        console.log("Повідомлення: Вихідний день");
        break;
    default:
        console.log("Повідомлення: Звичайний робочий день");
}

// Завдання 3. Простий цикл for (числа від 1 до 15)
console.log("Послідовність чисел від 1 до 15:");
for (let i = 1; i <= 15; i++) {
    console.log(i);
}

// Завдання 4. Вкладений цикл (Таблиця множення)
console.log("Таблиця множення (1-10):");
for (let i = 1; i <= 10; i++) {
    let row = "";
    for (let j = 1; j <= 10; j++) {
        row += (i * j) + "\t";
    }
    console.log(row);
}