import React from 'react';
import './App.css';

// === ЗАВДАННЯ 1: Компонент з іменем [cite: 214-216] ===
function MyName() {
  return (
    <div className="name-section" style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
      <h1>Моє ім'я: Мікуленко Андрій</h1>
      <p>Лабораторна робота №11</p>
    </div>
  );
}

// === ЗАВДАННЯ 2: Компонент назви курсу [cite: 219-220] ===
function CourseTitle() {
  return <h2 style={{ color: "darkblue" }}>Курс: Основи Web-програмування</h2>;
}

// === ЗАВДАННЯ 2: Компонент списку тем ===
function TopicList() {
  const topics = [
    "HTML5 та семантика",
    "CSS3 (Flexbox, Grid)",
    "Основи JavaScript",
    "React: Компоненти та JSX"
  ];

  return (
    <div className="topics-section" style={{ textAlign: "left", display: "inline-block" }}>
      <h3>Вивчені теми:</h3>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}

// Головний компонент App
function App() {
  return (
    <div className="App" style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <MyName />
      <div style={{ marginTop: "20px", backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "10px" }}>
        <CourseTitle />
        <TopicList />
      </div>
    </div>
  );
}

export default App;