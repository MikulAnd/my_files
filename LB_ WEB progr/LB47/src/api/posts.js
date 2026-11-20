import { data, redirect } from 'react-router';
import { request } from './client';
import { isAuthor, requireUser } from '../auth/session';

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

export async function postsLoader() {
  return (await request('/posts')).sort(byNewest);
}

export async function postLoader({ params }) {
  return request(`/posts/${params.postId}`);
}

function readPostForm(formData) {
  const title = String(formData.get('title') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();
  const errors = {};
  if (title.length < 3) errors.title = 'Заголовок — щонайменше 3 символи';
  if (body.length < 10) errors.body = 'Текст — щонайменше 10 символів';
  return { values: { title, body }, errors };
}

export async function createPostAction({ request: req }) {
  const user = requireUser(req);
  const { values, errors } = readPostForm(await req.formData());
  if (Object.keys(errors).length) return data({ errors, values }, { status: 400 });

  const post = await request('/posts', {
    method: 'POST',
    body: {
      ...values,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
    },
  });
  return redirect(`/posts/${post.id}`);
}

async function loadOwnPost(req, postId) {
  const user = requireUser(req);
  const post = await postLoader({ params: { postId } });
  if (!isAuthor(user, post)) {
    throw data('Редагувати й видаляти пост може лише його автор', { status: 403 });
  }
  return post;
}

export async function editPostLoader({ request: req, params }) {
  return loadOwnPost(req, params.postId);
}

export async function editPostAction({ request: req, params }) {
  await loadOwnPost(req, params.postId);
  const { values, errors } = readPostForm(await req.formData());
  if (Object.keys(errors).length) return data({ errors, values }, { status: 400 });

  await request(`/posts/${params.postId}`, {
    method: 'PATCH',
    body: { ...values, updatedAt: new Date().toISOString() },
  });
  return redirect(`/posts/${params.postId}`);
}

export async function deletePostAction({ request: req, params }) {
  await loadOwnPost(req, params.postId);
  await request(`/posts/${params.postId}`, { method: 'DELETE' });
  return redirect('/');
}

export async function myPostsLoader({ request: req }) {
  const user = requireUser(req);
  const posts = await request('/posts');
  return posts.filter((post) => isAuthor(user, post)).sort(byNewest);
}