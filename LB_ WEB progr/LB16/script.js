// 1. Оголошення змінних різних типів
let myName = "Андрій"; 
const myAge = 39;      
let isStudent = false; 

// Вивід типів даних у консоль
console.log("Ім'я:", myName, "| Тип:", typeof myName);
console.log("Вік:", myAge, "| Тип:", typeof myAge);
console.log("Статус студента:", isStudent, "| Тип:", typeof isStudent);

// 2. Створення об'єкта
let person = {
    name: myName,
    age: myAge,
    city: "Kharkiv"
};
console.log("Об'єкт користувача:", person);
console.log("Тип змінної person:", typeof person);

// 3. Створення масиву
let hobbies = ["автомобілі", "програмування", "відеоігри"];
console.log("Список захоплень:", hobbies);
console.log("Чи є масив об'єктом:", typeof hobbies);

// 4. Використання логічних операторів
let canDrive = myAge >= 18; 
console.log("Чи має право керувати авто за віком:", canDrive);

// Оператор ?? (значення за замовчуванням)
let nickname = null;
let userGreeting = nickname ?? myName;
console.log("Вітання:", userGreeting);

// 5. Приведення типів даних
let stringNumber = "123";
let convertedNumber = Number(stringNumber); // Перетворення рядка в число

let originalValue = 500;
let convertedString = String(originalValue); // Перетворення числа в рядок

console.log("Результат перетворення в число:", convertedNumber, typeof convertedNumber);
console.log("Результат перетворення в рядок:", convertedString, typeof convertedString);