import React, { Component } from 'react';
import './App.css';

function UserInfo(props) {
  return (
    <div style={{ padding: "10px", backgroundColor: "#e8f4f8", borderRadius: "5px" }}>
      <p>Привіт, мене звати {props.name}, мені {props.age} років.</p>
    </div>
  );
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div style={{ padding: "10px", backgroundColor: "#f9ebea", borderRadius: "5px", marginTop: "10px" }}>
        <p>Поточне значення лічильника: <strong>{this.state.count}</strong></p>
        <button onClick={this.increment} style={{ padding: "5px 15px", cursor: "pointer" }}>
          Збільшити
        </button>
      </div>
    );
  }
}

function StudentItem({ name, group }) {
  return (
    <li style={{ margin: "5px 0" }}>
      <strong>{name}</strong> — Група: {group}
    </li>
  );
}

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        { id: 1, name: "Мікуленко Андрій", group: "ПЗ-11-11" },
        { id: 2, name: "Олександр Іванов", group: "ІТ-21" },
        { id: 3, name: "Марія Петренко", group: "ІТ-22" }
      ]
    };
  }

  render() {
    return (
      <div style={{ padding: "10px", backgroundColor: "#e9f7ef", borderRadius: "5px", marginTop: "10px" }}>
        <h3>Список студентів:</h3>
        <ul>
          {this.state.students.map(student => (
            <StudentItem key={student.id} name={student.name} group={student.group} />
          ))}
        </ul>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Завдання 1</h2>
      <UserInfo name="Андрій" age={39} />
      
      <hr style={{ margin: "20px 0" }} />

      <h2>Завдання 2</h2>
      <Counter />

      <hr style={{ margin: "20px 0" }} />

      <h2>Додаткове завдання</h2>
      <StudentList />
    </div>
  );
}

export default App;