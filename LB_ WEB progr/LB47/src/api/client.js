import { data } from 'react-router';

const API_URL = 'http://localhost:3001';

export async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw data('Немає зв’язку з базою даних. Запустіть npm run server', { status: 503 });
  }
  if (res.status === 404) throw data('Запис не знайдено', { status: 404 });
  if (!res.ok) throw data('Помилка сервера', { status: res.status });
  return res.json();
}