// --- Частина 1. Колбеки ---
// 1.1 Функція processNumber
function processNumber(num, callback) {
    console.log("Результат операції:");
    console.log(callback(num));
}

// 1.2 & 1.3 Різні колбеки
function multiplyByTen(x) { return x * 10; }
function powerOfThree(x) { return Math.pow(x, 3); }

processNumber(5, multiplyByTen); // 50
processNumber(3, powerOfThree);  // 27

// --- Частина 2. Стрілкові функції ---
// 2.1 Переписування у стрілкові
const multiplyArrow = x => x * 10;
const powerArrow = x => Math.pow(x, 3);

processNumber(8, multiplyArrow);
processNumber(4, powerArrow);

// 2.2 Відмінність this (Андрій, 39 років)
const devObj = {
    name: 'Андрій',
    age: 39,
    sayRegular: function() { 
        console.log("Звичайна функція (this):", this.name); 
    },
    sayArrow: () => { 
        console.log("Стрілкова функція (this):", this.name); 
    }
};

devObj.sayRegular(); // Виведе: Андрій
devObj.sayArrow();   // Виведе: undefined (бере контекст зовні)

// --- Частина 3. Ключове слово this ---
const person = {
    name: 'Андрій (ПЗ-11-11)',
    sayName: function() {
        console.log("Контекст імені:", this.name);
    }
};

person.sayName(); 

// Втрата контексту
const lostContext = person.sayName;
lostContext(); // undefined

// Виправлення через bind
const fixedContext = person.sayName.bind(person);
fixedContext(); // Андрій (ПЗ-11-11)

// --- Частина 4. Методи call, apply, bind ---
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user1 = { name: 'Андрій' };
const user2 = { name: 'Олексій (колега)' };

// call (аргументи через кому)
greet.call(user1, 'Привіт', '!'); 

// apply (аргументи масивом)
greet.apply(user2, ['Вітаю', '...']); 

// bind (фіксація контексту)
const greetFixed = greet.bind(user1, 'Добрий день');
greetFixed('.');