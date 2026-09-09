import React from 'react';
import './App.css';

// Завдання 1: Компонент для відображення імені студента
function MyName() {
  return <h1>Моє ім'я: Андрій!</h1>;
}

// Завдання 2: Компонент для відображення назви курсу
function CourseTitle() {
  return <h2>Курс: Розробка веб-застосунків на React</h2>;
}

// Завдання 2: Компонент для відображення списку тем курсу
function CourseTopics() {
  return (
    <div className="topics">
      <h3>Список тем курсу:</h3>
      <ul>
        <li>Вступ до React та налаштування оточення</li>
        <li>Компонентний та декларативний підхід</li>
        <li>Основи JSX та синтаксис</li>
        <li>Робота з Props та State</li>
        <li>Життєвий цикл компонентів</li>
      </ul>
    </div>
  );
}

// Головний компонент, який об'єднує всі інші
function App() {
  return (
    <div className="App">
      <p className="student-info">Лабораторна робота №34 | Група ПЗ-21-11</p>
      <MyName />
      <CourseTitle />
      <CourseTopics />
    </div>
  );
}

export default App;