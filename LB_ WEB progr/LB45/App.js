import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState, todoFilterState } from './atoms';
import { incompleteCount, filteredTodoListState } from './selectors';
import './App.css';

function AddTodo() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText('');
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Що потрібно зробити?"
        onKeyDown={(e) => e.key === 'Enter' && add()}
      />
      <button onClick={add} className="btn-primary">Додати</button>
    </div>
  );
}

function TodoFilters() {
  const [filter, setFilter] = useRecoilState(todoFilterState);
  const setTodos = useSetRecoilState(todoListState);

  const clearCompleted = () => {
    setTodos((todos) => todos.filter((todo) => !todo.done));
  };

  return (
    <div className="filters-panel">
      <div className="filter-tabs">
        {['All', 'Active', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`tab-btn ${filter === tab ? 'active' : ''}`}
          >
            {tab === 'All' ? 'Всі' : tab === 'Active' ? 'Активні' : 'Виконані'}
          </button>
        ))}
      </div>
      <button onClick={clearCompleted} className="btn-clear">Очистити виконані</button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const filteredTodos = useRecoilValue(filteredTodoListState);
  const leftCount = useRecoilValue(incompleteCount);

  const toggle = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <p className="status-text">Залишилось задач: <strong>{leftCount}</strong></p>
      
      <TodoFilters />

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.done ? 'completed' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggle(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
            </label>
            <button onClick={() => remove(todo.id)} className="btn-delete" title="Видалити">
              ✖
            </button>
          </li>
        ))}
      </ul>
      {filteredTodos.length === 0 && <p className="empty-msg">Список порожній</p>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота: Recoil</h1>
        <p>Тема: Стан управління у React (Todo-додаток)</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>
      <div className="card">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}

export default App;