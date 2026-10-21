import React from 'react';
import { useTheme } from './ThemeContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import './App.css';

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="header">
      <h1>ЛР 46: Context API</h1>
      <div className="theme-switcher">
        <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} title="Світла">
          <FiSun />
        </button>
        <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} title="Темна">
          <FiMoon />
        </button>
        <button className={theme === 'system' ? 'active' : ''} onClick={() => setTheme('system')} title="Системна">
          <FiMonitor />
        </button>
      </div>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();
  return (
    <main className="content">
      <h2>Перемикач теми</h2>
      <p>
        Цей застосунок використовує <strong>React Context API</strong> для передачі стану теми. 
        Поточний обраний режим: <span className="badge">{theme}</span>.
      </p>
      <p>
        Тема автоматично зберігається у <code>localStorage</code>, тому після оновлення сторінки вона не зникне.
        Режим "Системна" реагує на налаштування вашої ОС.
      </p>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Виконав: Мікуленко Андрій (ПЗ-21-11)</p>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;