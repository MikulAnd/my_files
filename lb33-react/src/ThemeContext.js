import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Створюємо контекст
const ThemeContext = createContext(null);

// 2. Функція для отримання початкової теми (з localStorage або за замовчуванням system)
const getInitialTheme = () => {
  try {
    return localStorage.getItem('theme') || 'system';
  } catch {
    return 'system';
  }
};

// 3. Провайдер контексту
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Ефект для встановлення атрибута data-theme на тег <html> та збереження в localStorage
  useEffect(() => {
    let actualTheme = theme;
    
    // Якщо вибрано системну тему, перевіряємо налаштування ОС
    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    document.documentElement.dataset.theme = actualTheme;

    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  // Ефект для відстеження зміни системної теми (якщо користувач змінить її в ОС)
  useEffect(() => {
    if (theme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Кастомний хук із перевіркою
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme потрібно викликати всередині ThemeProvider');
  return ctx;
};