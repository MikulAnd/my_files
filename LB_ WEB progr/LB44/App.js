import React, { useState } from 'react';
import './App.css';

// ==========================================
// ЗАВДАННЯ 1: Список покупок (Actions)
// ==========================================
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

// ==========================================
// ЗАВДАННЯ 2: Управління користувачами (Actions)
// ==========================================
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const removeUser = (id) => ({
  type: REMOVE_USER,
  payload: id,
});

export const updateUser = (id, updatedFields) => ({
  type: UPDATE_USER,
  payload: { id, updatedFields },
});

// ==========================================
// ЗАВДАННЯ 3 (ДОДАТКОВЕ): Todo-список (Actions)
// ==========================================
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false },
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const editTodo = (id, newText) => ({
  type: EDIT_TODO,
  payload: { id, newText },
});

// ==========================================
// ІНТЕРФЕЙС ДЛЯ ДЕМОНСТРАЦІЇ РОБОТИ ACTIONS
// ==========================================
function App() {
  const [lastAction, setLastAction] = useState(null);

  const handleRun = (actionCreator, label) => {
    const action = actionCreator();
    console.log(`[${label}]:`, action);
    setLastAction({ label, data: action });
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №44</h1>
        <p>Тема: Визначення дій (Actions) для управління станом</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>

      <div className="card">
        <h3>Завдання 1: Список покупок</h3>
        <div className="btn-group">
          <button onClick={() => handleRun(() => addProduct({ id: 1, name: 'Молоко', quantity: 2 }), 'addProduct')}>
            addProduct()
          </button>
          <button onClick={() => handleRun(() => removeProduct(1), 'removeProduct')}>
            removeProduct(1)
          </button>
          <button onClick={() => handleRun(() => updateQuantity(1, 5), 'updateQuantity')}>
            updateQuantity(1, 5)
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Завдання 2: Управління користувачами</h3>
        <div className="btn-group">
          <button onClick={() => handleRun(() => addUser({ id: 1, name: 'Олена', email: 'olena@example.com' }), 'addUser')}>
            addUser()
          </button>
          <button onClick={() => handleRun(() => removeUser(1), 'removeUser')}>
            removeUser(1)
          </button>
          <button onClick={() => handleRun(() => updateUser(1, { email: 'olena.new@example.com' }), 'updateUser')}>
            updateUser(1)
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Завдання 3: Todo-список (Додаткове)</h3>
        <div className="btn-group">
          <button onClick={() => handleRun(() => addTodo('Вивчити Actions в Redux'), 'addTodo')}>
            addTodo()
          </button>
          <button onClick={() => handleRun(() => toggleTodo(101), 'toggleTodo')}>
            toggleTodo(101)
          </button>
          <button onClick={() => handleRun(() => editTodo(101, 'Оновлений текст завдання'), 'editTodo')}>
            editTodo(101)
          </button>
          <button onClick={() => handleRun(() => removeTodo(101), 'removeTodo')}>
            removeTodo(101)
          </button>
        </div>
      </div>

      {lastAction && (
        <div className="card result-card">
          <h3>Результат генерації дії ({lastAction.label}):</h3>
          <pre>{JSON.stringify(lastAction.data, null, 2)}</pre>
          <small>Також перевірте результат у консолі браузера (F12)</small>
        </div>
      )}
    </div>
  );
}

export default App;