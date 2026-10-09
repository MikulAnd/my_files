import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

// Завдання 1: Робота зі станом за допомогою useState
function TextCounter() {
  const [text, setText] = useState("");

  return (
    <div className="card">
      <h3>Завдання 1: useState (Підрахунок символів)</h3>
      <input
        type="text"
        placeholder="Введіть текст..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-field"
      />
      <p>Кількість символів: <strong>{text.length}</strong></p>
    </div>
  );
}

// Завдання 2: Завантаження даних за допомогою useEffect
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      <h3>Завдання 2: useEffect (Список користувачів)</h3>
      {loading ? (
        <p>Завантаження даних...</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Ім'я</th>
                <th>Email</th>
                <th>Місто</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Завдання 3: Оптимізація обчислень за допомогою useMemo
function SumCalculator() {
  const [numbers] = useState([10, 20, 30, 40, 50]);
  const [count, setCount] = useState(0);

  const sum = useMemo(() => {
    console.log("Обчислення суми через useMemo...");
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return (
    <div className="card">
      <h3>Завдання 3: useMemo (Оптимізація обчислень)</h3>
      <p>Масив чисел: [10, 20, 30, 40, 50]</p>
      <p>Сума чисел: <strong>{sum}</strong></p>
      <button onClick={() => setCount(count + 1)}>
        Перерендерити компонент ({count})
      </button>
    </div>
  );
}

// Завдання 4: Дочірній компонент для перевірки useCallback
const ChildButton = React.memo(function ChildButton({ onClick }) {
  console.log("Рендер дочірнього компонента (ChildButton)");
  return (
    <button onClick={onClick} className="secondary-btn">
      Натисни кнопку (Child)
    </button>
  );
});

// Завдання 4: Батьківський компонент з useCallback
function CallbackParent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Кнопка в Child натиснута!");
  }, []);

  return (
    <div className="card">
      <h3>Завдання 4: useCallback (Мемоізація callback)</h3>
      <p>Лічильник батьківського компонента: <strong>{count}</strong></p>
      <div className="btn-group">
        <button onClick={() => setCount(count + 1)}>Збільшити лічильник</button>
        <ChildButton onClick={handleClick} />
      </div>
    </div>
  );
}

// Головний компонент
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №39</h1>
        <p>Тема: React Hooks (useState, useEffect, useMemo, useCallback)</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>

      <TextCounter />
      <UsersList />
      <SumCalculator />
      <CallbackParent />
    </div>
  );
}

export default App;