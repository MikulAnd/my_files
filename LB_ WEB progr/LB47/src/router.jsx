import { createBrowserRouter, Navigate } from 'react-router';
import RootLayout from './layouts/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import {
  postsLoader,
  postLoader,
  myPostsLoader,
  createPostAction,
  editPostLoader,
  editPostAction,
  deletePostAction,
} from './api/posts';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: HomePage, loader: postsLoader },
      { path: 'posts/:postId', Component: PostPage, loader: postLoader, ErrorBoundary: ErrorPage },
      { path: 'posts/:postId/destroy', action: deletePostAction, ErrorBoundary: ErrorPage },
      {
        path: 'about',
        lazy: async () => {
          const { default: Component } = await import('./pages/AboutPage');
          return { Component };
        },
      },
      { path: 'blog', element: <Navigate to="/" replace /> },
      { path: 'login', Component: LoginPage },
      {
        Component: ProtectedRoute,
        ErrorBoundary: ErrorPage,
        children: [
          { path: 'admin', Component: AdminPage, loader: myPostsLoader },
          { path: 'posts/new', Component: NewPostPage, action: createPostAction },
          { path: 'posts/:postId/edit', Component: EditPostPage, loader: editPostLoader, action: editPostAction },
        ],
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);