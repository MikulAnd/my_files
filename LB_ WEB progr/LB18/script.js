// Завдання 1. Робота з масивом чисел
let numbers = [3, 7, 10, 15, 20]; // [cite: 766]

// Подвоєння кожного числа за допомогою map()
let doubledNumbers = numbers.map(num => num * 2); // [cite: 851]
console.log("Подвоєні числа:", doubledNumbers);

// Отримання лише парних чисел за допомогою filter()
let evenNumbers = numbers.filter(num => num % 2 === 0); // [cite: 852]
console.log("Парні числа:", evenNumbers);

// Пошук першого числа більше 10 за допомогою find()
let foundNumber = numbers.find(num => num > 10); // [cite: 856]
console.log("Перше число > 10:", foundNumber);

// Перебір масиву за допомогою forEach()
numbers.forEach((num, index) => {
    console.log(`Елемент за індексом ${index}: ${num}`); // [cite: 853-855]
});

// Завдання 2. Функції
// Звичайна функція суми
function add(a, b) {
    return a + b; // [cite: 857-858]
}
console.log("Сума 5 + 8:", add(5, 8));

// Стрілкова функція множення
const multiply = (a, b) => a * b; // [cite: 860]
console.log("Множення 4 * 3:", multiply(4, 3));

// Функція з параметром за замовчуванням
function greet(name = "Гість") {
    return "Привіт, " + name; // [cite: 861-863]
}
console.log(greet());
console.log(greet("Юра"));

// Завдання 3. Об'єкт "студент" з методом
let student = {
    name: "Юра",
    age: 39,
    group: "ІП-21",
    showInfo: function() {
        console.log("Інформація про студента:");
        console.log("Ім'я: " + this.name); // [cite: 835-836, 869-871]
        console.log("Вік: " + this.age); // [cite: 837-838, 872-873]
        console.log("Група: " + this.group); // [cite: 839, 874]
    }
};

student.showInfo(); // [cite: 885]