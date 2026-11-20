import { Form, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { isAuthor } from '../auth/session';

export default function PostActions({ post }) {
  const { user } = useAuth();
  if (!isAuthor(user, post)) return null;

  function confirmDelete(e) {
    if (!window.confirm('Видалити цей пост назавжди?')) e.preventDefault();
  }

  return (
    <div className="post-actions">
      <Link to={`/posts/${post.id}/edit`}>✏️ Редагувати</Link>
      <Form method="post" action={`/posts/${post.id}/destroy`} onSubmit={confirmDelete}>
        <button type="submit">🗑 Видалити</button>
      </Form>
    </div>
  );
}