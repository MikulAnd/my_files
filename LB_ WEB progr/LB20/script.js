// 1. Створення класу Person та об'єктів
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 2. Методи та використання this
  introduce() {
    console.log(`Привіт! Мене звати ${this.name}, мені ${this.age} років.`);
  }
}

// Створення екземплярів класу
const person1 = new Person("Андрій", 39);
const person2 = new Person("Олена", 30);
const person3 = new Person("Іван", 25);

person1.introduce();
person2.introduce();
person3.introduce();

// 3. Наслідування (Клас Student для групи ПЗ-11-11)
class Student extends Person {
  constructor(name, age, course, group) {
    super(name, age); // Виклик конструктора батьківського класу
    this.course = course;
    this.group = group;
  }

  introduce() {
    console.log(`Я студент ${this.course} курсу групи ${this.group}. Мене звати ${this.name}.`);
  }
}

const student1 = new Student("Андрій", 39, 2, "ПЗ-11-11");
student1.introduce();

// 4. Інкапсуляція (Приватна властивість #balance)
class BankAccount {
  #balance = 0; // Приватне поле

  deposit(amount) {
    this.#balance += amount;
    console.log(`Додано: ${amount}. Новий баланс: ${this.#balance}`);
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log(`Баланс рахунку Андрія: ${account.getBalance()}`);

// 5. Поліморфізм
class Animal {
  speak() {
    console.log("Тварина видає звук.");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Собака гавкає.");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Кіт нявкає.");
  }
}

const dog = new Dog();
const cat = new Cat();

dog.speak();
cat.speak();