import React, { Component } from 'react';
import './App.css';

// Завдання 1: Функціональний компонент UserInfo з пропсами name та age
function UserInfo(props) {
  return (
    <div className="card user-info">
      <h3>Завдання 1: Функціональний компонент (Props)</h3>
      <p>Привіт, мене звати <strong>{props.name}</strong>, мені <strong>{props.age}</strong> років.</p>
    </div>
  );
}

// Завдання 2: Класовий компонент Counter зі станом (state)
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="card counter">
        <h3>Завдання 2: Класовий компонент (State)</h3>
        <p>Поточне значення лічильника: <strong>{this.state.count}</strong></p>
        <button onClick={this.increment}>Збільшити</button>
      </div>
    );
  }
}

// Додаткове завдання (пункт 2): Функціональний компонент для одного студента
function StudentItem(props) {
  return (
    <li className="student-item">
      <span>{props.name}</span> — <strong>{props.group}</strong>
    </li>
  );
}

// Додаткове завдання: Класовий компонент для управління списком студентів
class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        { id: 1, name: 'Андрій Мікуленко', group: 'ПЗ-21-11' },
        { id: 2, name: 'Артур Коритко', group: 'ПЗ-21-11' },
        { id: 3, name: 'Альона Богатиренко ', group: 'ПЗ-21-11' }
      ]
    };
  }

  render() {
    return (
      <div className="card student-list">
        <h3>Додаткове завдання: Список студентів</h3>
        <ul>
          {this.state.students.map((student) => (
            <StudentItem key={student.id} name={student.name} group={student.group} />
          ))}
        </ul>
      </div>
    );
  }
}

// Головний застосунок
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №35</h1>
        <p>Тема: Функціональні та класові компоненти в React</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>

      {/* Виклик завдання 1 */}
      <UserInfo name="Андрій" age={39} />

      {/* Виклик завдання 2 */}
      <Counter />

      {/* Виклик додаткового завдання */}
      <StudentList />
    </div>
  );
}

export default App;