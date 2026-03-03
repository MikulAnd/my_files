// --- Частина 1. Деструктуризація масивів ---
// 1.1 Країни замість міст
const locations = ["Україна", "Італія", "Норвегія"];
const [firstCountry, secondCountry, thirdCountry] = locations;
console.log("Локації:", firstCountry, secondCountry, thirdCountry);

// 1.2 Робота з цінами (spread/rest)
const prices = [120, 450, 890, 1200, 5000];
const [minPrice, ...otherPrices] = prices;
console.log("Мінімальна ціна:", minPrice);
console.log("Решта цін:", otherPrices);

// 1.3 Значення за замовчуванням (налаштування системи)
const userPrefs = ['dark-mode'];
const [theme = 'light', lang = 'uk', fontSize = '14px'] = userPrefs;
console.log("Налаштування інтерфейсу:", theme, lang, fontSize);

// --- Частина 2. Деструктуризація об'єктів ---
// 2.1 & 2.2 Профіль користувача (Андрій, 39 років)
const profile = {
    userName: 'Андрій',
    userAge: 39,
    status: 'active'
};
const { userName: name, userAge: age } = profile;
console.log("Користувач:", name, "Вік:", age);

// 2.3 Вкладені дані (параметри мережі)
const network = {
    domain: 'it-college.kh.ua',
    params: {
        ip: '10.0.0.1',
        dns: '8.8.8.8'
    }
};
const { params: { ip, dns } } = network;
console.log("Мережеві дані:", ip, dns);

// --- Частина 3. Оператор spread ---
// 3.1 Об'єднання списків навичок
const basicSkills = ["HTML", "CSS"];
const proSkills = ["JS ES6", "React"];
const fullStack = [...basicSkills, ...proSkills];
console.log("Стек навичок:", fullStack);

// 3.2 & 3.3 Оновлення об'єкта авто (Renault Megane 3)
const myCar = { brand: "Renault", model: "Megane 3", engine: "K4M" };
const updatedCar = { ...myCar, year: 2012, mileage: 185000 };
console.log("Дані автомобіля:", updatedCar);

// --- Частина 4. Оператор rest ---
// 4.1 Функція обчислення загальної суми
function getTotalSum(...amounts) {
    return amounts.reduce((acc, val) => acc + val, 0);
}
console.log("Загальна сума:", getTotalSum(15, 30, 45, 10));

// --- Частина 5. Практичне завдання (Реєстр працівників) ---
const staff = [
    { id: 101, name: 'Олександр', pos: 'Designer' },
    { id: 102, name: 'Тетяна', pos: 'Manager' }
];

// 5.1 Функція map з деструктуризацією
const getStaffNames = (list) => list.map(({ name }) => name);
console.log("Імена штату:", getStaffNames(staff));

// 5.2 Додавання себе через spread
const updatedStaff = [...staff, { id: 103, name: 'Андрій', pos: 'Lead Dev' }];

// 5.3 Функція addStaff
function addStaff(currentList, ...newMembers) {
    return [...currentList, ...newMembers];
}
const finalStaff = addStaff(updatedStaff, { id: 104, name: 'Дмитро' }, { id: 105, name: 'Олена' });
console.log("Фінальний реєстр:", finalStaff);