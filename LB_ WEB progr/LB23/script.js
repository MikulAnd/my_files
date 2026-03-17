// Вхідні дані
const numbers = [10, 25, 39, 42, 55]; 
const fruits = ['яблуко', 'банан', 'апельсин', 'вишня'];

// Крок 1. forEach()
console.log("--- Список чисел ---");
numbers.forEach(num => console.log(`Елемент: ${num}`));

// Крок 2. map()
const doubled = numbers.map(num => num * 2);
console.log("Подвоєні значення:", doubled);

// Крок 3. filter() (фільтрація за віком 39)
const olderThan39 = numbers.filter(num => num > 39);
console.log("Числа більше 39:", olderThan39);

// Крок 4. find() та findIndex()
const firstOver30 = numbers.find(num => num > 30);
const ageIndex = numbers.findIndex(num => num === 39);
console.log("Перше > 30:", firstOver30, "| Індекс числа 39:", ageIndex);

// Крок 5. reduce()
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Сума всіх елементів:", sum);

// Крок 6. some() та every()
const hasLarge = numbers.some(num => num > 50);
const allPositive = numbers.every(num => num > 0);
console.log("Є числа > 50:", hasLarge, "| Усі додатні:", allPositive);

// Крок 7. includes() та indexOf()
console.log("Наявність банана:", fruits.includes('банан'));
console.log("Позиція апельсина:", fruits.indexOf('апельсин'));

// Крок 8. splice() та slice()
const updatedFruits = [...fruits];
updatedFruits.splice(1, 1, 'груша'); 
const partialNumbers = numbers.slice(1, 4);
console.log("Оновлені фрукти:", updatedFruits);
console.log("Зріз масиву чисел:", partialNumbers);

// Крок 9. flatMap(), sort(), reverse()
const info = ["Andriy", "PZ-11-11"];
const chars = info.flatMap(str => str.split(''));
console.log("Розгорнутий масив:", chars);

const sorted = [...numbers].sort((a, b) => a - b);
const reversed = [...fruits].reverse();
console.log("Сортування:", sorted);
console.log("Реверс:", reversed);