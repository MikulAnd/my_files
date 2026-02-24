// 1. Створення об'єкта через літерал
let teacher = {
    name: "Олена",
    subject: "Математика",
    experience: 10
};

// 2. Робота з властивостями
teacher.experience = 12; // Зміна стажу
teacher.category = "Вища"; // Додавання нової властивості
delete teacher.subject; // Видалення предмету

console.log("Чи є стаж у об'єкті:", "experience" in teacher);
console.log("Чи є категорія (hasOwnProperty):", teacher.hasOwnProperty("category"));

// 3. Методи об'єкта та використання this
teacher.introduce = function() {
    console.log(`Я ${this.name}, мій стаж: ${this.experience} років. Категорія: ${this.category}`);
};
teacher.introduce();

// 4. Перебір властивостей (цикл for...in)
console.log("--- Перебір властивостей ---");
for (let key in teacher) {
    if (typeof teacher[key] !== 'function') {
        console.log(`${key}: ${teacher[key]}`);
    }
}

// 5. Копіювання об'єкта (Spread operator)
let teacherCopy = { ...teacher };
teacherCopy.name = "Ірина";
console.log("Оригінальний викладач:", teacher.name);
console.log("Копія викладача:", teacherCopy.name);

// 6. Вкладені об'єкти (твоє авто Renault Megane)
teacher.car = {
    brand: "Renault",
    model: "Megane 3",
    engine: "K4M"
};
console.log("Автомобіль викладача:", teacher.car.brand, teacher.car.model);

// 7. Прототипне наслідування
let person = {
    hasPassport: true
};

let student = Object.create(person);
student.name = "Андрій";
student.group = "ПЗ-11-11";

console.log(`Студент: ${student.name}, Група: ${student.group}`);
console.log("Наявність паспорта (успадковано):", student.hasPassport);