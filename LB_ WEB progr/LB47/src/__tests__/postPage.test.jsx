import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, data, RouterProvider } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import PostPage from '../pages/PostPage';
import ErrorPage from '../pages/ErrorPage';

const posts = [
  { id: '2', title: 'qui est esse', body: 'Текст поста', authorId: '1', authorName: 'Олена' },
];

function fakePostLoader({ params }) {
  const post = posts.find((p) => p.id === String(params.postId));
  if (!post) throw data(`Пост №${params.postId} не знайдено`, { status: 404 });
  return post;
}

function renderPostAt(path) {
  const router = createMemoryRouter(
    [{ path: '/posts/:postId', Component: PostPage, loader: fakePostLoader, ErrorBoundary: ErrorPage }],
    { initialEntries: [path] }
  );
  return render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

test('сторінка поста показує заголовок', async () => {
  renderPostAt('/posts/2');
  expect(await screen.findByRole('heading', { name: 'qui est esse' })).toBeInTheDocument();
});

test('неіснуючий пост показує помилку 404', async () => {
  renderPostAt('/posts/999');
  expect(await screen.findByRole('heading', { name: 'Помилка 404' })).toBeInTheDocument();
});