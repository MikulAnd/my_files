import { afterEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import PostPage from '../pages/PostPage';
import { saveCurrentUser } from '../auth/session';

const testPost = {
  id: '2',
  title: 'Хуки у React',
  body: 'Текст',
  authorId: '1',
  authorName: 'Олена',
  createdAt: '2026-10-03T12:30:00.000Z',
};

function renderPost() {
  const router = createMemoryRouter(
    [{ path: '/posts/:postId', Component: PostPage, loader: () => testPost }],
    { initialEntries: ['/posts/2'] }
  );
  return render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

afterEach(() => saveCurrentUser(null));

test('гість не бачить кнопок редагування', async () => {
  saveCurrentUser(null);
  renderPost();
  await screen.findByRole('heading', { name: 'Хуки у React' });
  expect(screen.queryByText(/Редагувати/)).not.toBeInTheDocument();
});

test('чужий користувач не бачить кнопок', async () => {
  saveCurrentUser({ id: '2', name: 'Андрій' });
  renderPost();
  await screen.findByRole('heading', { name: 'Хуки у React' });
  expect(screen.queryByText(/Редагувати/)).not.toBeInTheDocument();
});

test('автор бачить «Редагувати» і «Видалити»', async () => {
  saveCurrentUser({ id: '1', name: 'Олена' });
  renderPost();
  expect(await screen.findByText(/Редагувати/)).toBeInTheDocument();
  expect(screen.getByText(/Видалити/)).toBeInTheDocument();
});