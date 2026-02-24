// Завдання 1. Робота з масивом чисел
let numbers = [3, 7, 10, 15, 20];

// Подвоєння кожного числа за допомогою map()
let doubledNumbers = numbers.map(num => num * 2);
console.log("Подвоєні числа:", doubledNumbers);

// Отримання лише парних чисел за допомогою filter()
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Парні числа:", evenNumbers);

// Пошук першого числа більше 10 за допомогою find()
let foundNumber = numbers.find(num => num > 10);
console.log("Перше число > 10:", foundNumber);

// Перебір масиву за допомогою forEach()
numbers.forEach((num, index) => {
    console.log(`Елемент за індексом ${index}: ${num}`);
});

// Завдання 2. Функції
function add(a, b) {
    return a + b;
}
console.log("Сума 5 + 8:", add(5, 8));

const multiply = (a, b) => a * b;
console.log("Множення 4 * 3:", multiply(4, 3));

function greet(name = "Гість") {
    return "Привіт, " + name;
}
console.log(greet());
console.log(greet("Андрій"));

// Завдання 3. Об'єкт з моїми даними
let student = {
    name: "Андрій",
    age: 39,
    group: "ПЗ-11-11",
    showInfo: function() {
        console.log("Інформація про студента:");
        console.log("Ім'я: " + this.name);
        console.log("Вік: " + this.age);
        console.log("Група: " + this.group);
    }
};

student.showInfo();