// 1. Знайомство з прототипом через __proto__
const baseUser = {
    name: 'Андрій',
    greet: function() {
        console.log(`Вітаю, я ${this.name}`);
    }
};

const studentProfile = {
    group: 'ПЗ-11-11',
    showStatus: function() {
        console.log(`${this.name} навчається у групі ${this.group}`);
    }
};

// Встановлюємо прототип
studentProfile.__proto__ = baseUser;

studentProfile.greet(); 
studentProfile.showStatus();

// 2. Використання Object.getPrototypeof() та Object.setPrototypeof()
const techBase = {
    showType: function() {
        console.log('Це об\'єкт технічного стеку');
    }
};

const jsNode = { skill: 'JavaScript' };

// Встановлюємо прототип офіційним методом
Object.setPrototypeOf(jsNode, techBase);

console.log("Перевірка прототипу:", Object.getPrototypeOf(jsNode) === techBase);
jsNode.showType();

// 3. Функції-конструктори та прототипи
function Specialist(name, age) {
    this.name = name;
    this.age = age;
}

// Додаємо метод до прототипу конструктора
Specialist.prototype.displayBio = function() {
    console.log(`Спеціаліст: ${this.name}, Вік: ${this.age}`);
};

const leadDev = new Specialist('Андрій', 39);
leadDev.displayBio();

// 4. Перевизначення методів прототипу (Затінення)
const machine = {
    start: function() {
        console.log('Машина запускається');
    }
};

const myCar = {
    brand: 'Renault Megane 3',
    // Власний метод перекриває метод прототипу
    start: function() {
        console.log(`${this.brand} заводиться (метод перевизначено)`);
    }
};

myCar.__proto__ = machine;
myCar.start(); 

// 5. Прототипне спадкування через конструктори
function Account(login) {
    this.login = login;
}

Account.prototype.signIn = function() {
    console.log(`Користувач ${this.login} увійшов у систему`);
};

function Moderator(login, permissions) {
    // Виклик конструктора батька
    Account.call(this, login);
    this.permissions = permissions;
}

// Наслідування прототипу
Moderator.prototype = Object.create(Account.prototype);
Moderator.prototype.constructor = Moderator;

// Перевизначення методу для Moderator
Moderator.prototype.signIn = function() {
    console.log(`Модератор ${this.login} (доступ: ${this.permissions}) авторизований`);
};

const adminUser = new Moderator('Andriy_PZ', 'Full-Access');
adminUser.signIn();