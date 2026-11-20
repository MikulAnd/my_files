import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

function renderAt(path) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/login" element={<h1>Сторінка входу</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<h1>Адмінка</h1>} />
            <Route path="/posts/new" element={<h1>Новий пост</h1>} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe('маршрутизація', () => {
  test('невідома адреса показує 404', () => {
    renderAt('/abc');
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument();
  });

  test('неавторизованого користувача перенаправляє на /login з /admin', () => {
    renderAt('/admin');
    expect(screen.getByRole('heading', { name: 'Сторінка входу' })).toBeInTheDocument();
  });

  test('без входу /posts/new веде на /login', () => {
    renderAt('/posts/new');
    expect(screen.getByRole('heading', { name: 'Сторінка входу' })).toBeInTheDocument();
  });
});