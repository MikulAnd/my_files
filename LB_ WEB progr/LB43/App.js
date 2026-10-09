import React, { useState, useReducer } from 'react';
import './App.css';

// ==========================================
// ІНДИВІДУАЛЬНЕ ЗАВДАННЯ (Варіант 2: Список студентів)
// ==========================================
const initialStudentsState = {
  students: [
    { id: 1, name: 'Андрій Мікуленко', group: 'ПЗ-21-11' },
    { id: 2, name: 'Олександр Коваленко', group: 'ПЗ-21-11' }
  ]
};

function studentsReducer(state = initialStudentsState, action) {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload]
      };

    case 'REMOVE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id
            ? { ...student, name: action.payload.name, group: action.payload.group }
            : student
        )
      };

    default:
      return state;
  }
}

// ==========================================
// КОМПОНЕНТ ДЛЯ ПЕРЕВІРКИ ЗАВДАНЬ 1 ТА 2 (Counter Reducer)
// ==========================================
const initialCounterState = { count: 0 };

function counterReducer(state = initialCounterState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

function CounterSection() {
  const [state, dispatch] = useReducer(counterReducer, initialCounterState);

  return (
    <div className="card">
      <h3>Завдання 1 та 2: Counter Reducer (з Payload)</h3>
      <p>Значення лічильника: <strong>{state.count}</strong></p>
      <div className="btn-group">
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        <button onClick={() => dispatch({ type: 'SET_COUNT', payload: 100 })}>Встановити 100</button>
      </div>
    </div>
  );
}

// ==========================================
// КОМПОНЕНТ ІНДИВІДУАЛЬНОГО ВАРІАНТА
// ==========================================
function StudentsSection() {
  const [state, dispatch] = useReducer(studentsReducer, initialStudentsState);
  const [name, setName] = useState('');
  const [group, setGroup] = useState('ПЗ-21-11');
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editId) {
      dispatch({
        type: 'UPDATE_STUDENT',
        payload: { id: editId, name, group }
      });
      setEditId(null);
    } else {
      dispatch({
        type: 'ADD_STUDENT',
        payload: { id: Date.now(), name, group }
      });
    }
    setName('');
  };

  const startEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setGroup(student.group);
  };

  return (
    <div className="card">
      <h3>Індивідуальне завдання: Варіант 2 (Список студентів)</h3>
      <form onSubmit={handleAddOrUpdate} className="student-form">
        <input
          type="text"
          placeholder="ПІБ студента"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Група"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          {editId ? 'Зберегти зміни' : 'Додати студента'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setName(''); }}>
            Скасувати
          </button>
        )}
      </form>

      <ul className="students-list">
        {state.students.map((student) => (
          <li key={student.id} className="student-row">
            <span><strong>{student.name}</strong> ({student.group})</span>
            <div className="item-actions">
              <button onClick={() => startEdit(student)} className="btn-edit">Редагувати</button>
              <button
                onClick={() => dispatch({ type: 'REMOVE_STUDENT', payload: student.id })}
                className="btn-del"
              >
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
      {state.students.length === 0 && <p className="empty-text">Список порожній</p>}
    </div>
  );
}

// ==========================================
// ГОЛОВНИЙ КОМПОНЕНТ
// ==========================================
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота: Функції Reducer у Redux</h1>
        <p>Тема: Створення функцій reducer для оновлення стану</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>

      <CounterSection />
      <StudentsSection />
    </div>
  );
}

export default App;