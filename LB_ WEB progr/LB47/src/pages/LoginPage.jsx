import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const from = location.state?.from?.pathname ?? searchParams.get('redirectTo') ?? '/';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !password) return setError('Введіть ім’я та пароль');
    try {
      await login(name.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Вхід</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше ім'я"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Увійти</button>
    </form>
  );
}