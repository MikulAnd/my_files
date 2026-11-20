import { request } from './client';

export async function loginOrRegister(name, password) {
  const found = await request(`/users?name=${encodeURIComponent(name)}`);
  if (found.length > 0) {
    if (found[0].password !== password) throw new Error('Неправильний пароль');
    return { id: found[0].id, name: found[0].name };
  }
  const created = await request('/users', { method: 'POST', body: { name, password } });
  return { id: created.id, name: created.name };
}