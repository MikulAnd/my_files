import React, { Component } from "react";
import "./App.css";

// Задание 1: Таймер с componentDidMount и componentWillUnmount
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="card">
        <h3>Завдання 1: Таймер</h3>
        <p>Таймер: <strong>{this.state.seconds}</strong> секунд</p>
      </div>
    );
  }
}

// Задание 2: Загрузка пользователей по API в componentDidMount
class ApiFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ users: data, loading: false }))
      .catch((error) => console.error("Помилка завантаження:", error));
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div className="card">
        <h3>Завдання 2: API Fetcher</h3>
        {loading ? (
          <p>Завантаження даних...</p>
        ) : (
          <ul className="user-list">
            {users.slice(0, 5).map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

// Задание 3: Дочерний компонент для демонстрации размонтирования
class Child extends Component {
  componentWillUnmount() {
    console.log("Child буде видалено!");
  }

  render() {
    return <p className="child-box">Я — активний дочірній компонент (Child)</p>;
  }
}

// Задание 3: Родительский компонент, управляющий показом/скрытием Child
class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = { showChild: true };
  }

  toggleChild = () => {
    this.setState((prevState) => ({ showChild: !prevState.showChild }));
  };

  render() {
    return (
      <div className="card">
        <h3>Завдання 3: Спостереження за розмонтуванням</h3>
        <button onClick={this.toggleChild}>
          {this.state.showChild ? "Сховати" : "Показати"} Child
        </button>
        {this.state.showChild && <Child />}
      </div>
    );
  }
}

// Главный компонент приложения
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №38</h1>
        <p>Тема: Життєвий цикл класових компонентів React</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>

      <Timer />
      <Parent />
      <ApiFetcher />
    </div>
  );
}

export default App;