import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './actions/itemActions';
import './App.css';

function ItemList() {
  const [inputText, setInputText] = useState('');
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    dispatch(addItem(inputText));
    setInputText('');
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  return (
    <div className="card">
      <h3>Керування списком через Redux</h3>
      
      <form onSubmit={handleAddItem} className="input-group">
        <input
          type="text"
          placeholder="Введіть новий елемент..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn-add">Додати в Store</button>
      </form>

      <ul className="redux-list">
        {items.map((item, index) => (
          <li key={index} className="redux-item">
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="btn-delete"
              title="Видалити"
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className="empty-msg">Список порожній</p>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №41</h1>
        <p>Тема: Основи Redux: store, action, reducer</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>
      <ItemList />
    </div>
  );
}

export default App;