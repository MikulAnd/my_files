import { redirect } from 'react-router';

const KEY = 'blog:user';

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  if (user) localStorage.setItem(KEY, JSON.stringify(user));
  else localStorage.removeItem(KEY);
}

export function requireUser(request) {
  const user = getCurrentUser();
  if (!user) {
    const from = new URL(request.url).pathname;
    throw redirect(`/login?redirectTo=${encodeURIComponent(from)}`);
  }
  return user;
}

export function isAuthor(user, post) {
  return Boolean(user) && String(user.id) === String(post.authorId);
}