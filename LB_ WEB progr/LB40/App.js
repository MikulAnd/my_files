import React, { useState, useRef } from "react";
import "./App.css";

// Задание 1: Управляемые компоненты (RegistrationForm)
function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Зареєстровано:\nІм'я: ${name}\nEmail: ${email}`);
  };

  return (
    <div className="card">
      <h3>Завдання 1: Керовані компоненти (useState)</h3>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label>Ім'я:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введіть ім'я"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" className="btn-primary">Зареєструватися</button>
      </form>
    </div>
  );
}

// Задание 2: Неуправляемые компоненты (UncontrolledLoginForm)
function UncontrolledLoginForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };
    console.log("Дані з неуправляємих компонентів:", data);
    alert(`Некерована форма відправлена! Перевірте консоль (F12).\nІм'я: ${data.name}`);
  };

  return (
    <div className="card">
      <h3>Завдання 2: Некеровані компоненти (useRef)</h3>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label>Ім'я:</label>
          <input type="text" ref={nameRef} placeholder="Ім'я через Ref" required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" ref={emailRef} placeholder="Email через Ref" required />
        </div>
        <button type="submit" className="btn-secondary">Відправити (в консоль)</button>
      </form>
    </div>
  );
}

// Задание 3: Многополевая форма (ProfileForm)
function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Профіль збережено:", formData);
    alert(`Профіль збережено:\n${formData.firstName} ${formData.lastName}, нар. ${formData.birthDate}`);
  };

  return (
    <div className="card">
      <h3>Завдання 3: Багатопольова форма (Один об'єкт у state)</h3>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label>Ім'я:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ім'я"
            required
          />
        </div>
        <div className="form-group">
          <label>Прізвище:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Прізвище"
            required
          />
        </div>
        <div className="form-group">
          <label>Дата народження:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-success">Зберегти профіль</button>
      </form>
    </div>
  );
}

// Задание 4: Валидация (ValidatedRegistrationForm)
function ValidatedRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове для заповнення";
    if (!formData.email.includes("@")) newErrors.email = "Введіть коректний email із '@'";
    if (!formData.password.trim()) newErrors.password = "Пароль не може бути порожнім";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Форма успішно пройшла валідацію та була відправлена!");
    }
  };

  return (
    <div className="card">
      <h3>Завдання 4: Форма з перевіркою (Валідація)</h3>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label>Ім'я:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введіть ім'я"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введіть email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введіть пароль"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <button type="submit" className="btn-warning">Перевірити та відправити</button>
      </form>
    </div>
  );
}

// Главный компонент
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Лабораторна робота №40</h1>
        <p>Тема: Робота з формами: керовані та некеровані компоненти</p>
        <p className="badge">Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
      </header>

      <RegistrationForm />
      <UncontrolledLoginForm />
      <ProfileForm />
      <ValidatedRegistrationForm />
    </div>
  );
}

export default App;