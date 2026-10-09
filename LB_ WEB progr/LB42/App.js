import React from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №42</h1>
        <p>Тема: Налаштування Redux та налагодження за допомогою DevTools</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>
      <Counter />
    </div>
  );
}

export default App;