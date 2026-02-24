import React, { useState } from 'react';
import './App.css';

// Завдання 1: Використання props 
function UserCard({ name, email }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <p>Ім'я: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Завдання 2: Використання state 
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h4>Лічильник: {count}</h4>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '5px' }}>Збільшити</button>
      <button onClick={() => setCount(count - 1)}>Зменшити</button>
    </div>
  );
}

// Завдання 3: Взаємодія між компонентами 
function TodoList({ tasks }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );
}

function TodoApp() {
  const [tasks, setTasks] = useState(['Вивчити props', 'Зрозуміти state']);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h4>Список завдань</h4>
      <TodoList tasks={tasks} />
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Нове завдання"
      />
      <button onClick={addTask} style={{ marginLeft: '5px' }}>Додати</button>
    </div>
  );
}

// Додаткове завдання: Список товарів 
function AddProduct({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (name && price) {
      onAddProduct({ name, price: parseFloat(price) });
      setName('');
      setPrice('');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Назва" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Ціна" 
        value={price} 
        onChange={e => setPrice(e.target.value)} 
        style={{ margin: '0 5px', width: '80px' }}
      />
      <button onClick={handleAdd}>Додати товар</button>
    </div>
  );
}

function ProductApp() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Ноутбук', price: 25000 },
    { id: 2, name: 'Мишка', price: 800 }
  ]);

  const addProduct = (newProduct) => {
    setProducts([...products, { id: Date.now(), ...newProduct }]);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h4>Магазин</h4>
      <AddProduct onAddProduct={addProduct} />
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} — {product.price} грн</li>
        ))}
      </ul>
    </div>
  );
}

// Головний компонент
function App() {
  return (
    <div className="App" style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>ЛР: Props та State</h2>
      <p>Виконав: Мікуленко Андрій, ПЗ-11-11</p>
      
      <h3>Завдання 1: Props</h3>
      <UserCard name="Андрій" email="andriy@test.com" />
      <UserCard name="Олександр" email="alex@test.com" />
      
      <h3>Завдання 2: State</h3>
      <Counter />
      
      <h3>Завдання 3: Взаємодія між компонентами</h3>
      <TodoApp />

      <h3>Додаткове завдання</h3>
      <ProductApp />
    </div>
  );
}

export default App;