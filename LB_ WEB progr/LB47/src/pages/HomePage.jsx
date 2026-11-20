import { Link, useLoaderData, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const posts = useLoaderData();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const author = searchParams.get('author') ?? 'all';
  const q = searchParams.get('q') ?? '';
  const authors = [...new Set(posts.map((post) => post.authorName))];

  function updateParam(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'all') next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );
  }

  const visible = posts.filter(
    (post) =>
      (author === 'all' || post.authorName === author) &&
      post.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section>
      <h1>Останні пости</h1>
      {user ? (
        <Link to="/posts/new" className="btn-new">+ Новий пост</Link>
      ) : (
        <p><Link to="/login">Увійдіть</Link>, щоб писати пости</p>
      )}
      <div className="filters">
        <input
          type="search"
          placeholder="Пошук…"
          value={q}
          onChange={(e) => updateParam('q', e.target.value)}
        />
        <select value={author} onChange={(e) => updateParam('author', e.target.value)}>
          <option value="all">Усі автори</option>
          {authors.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      {visible.length === 0 && <p>Нічого не знайдено</p>}
      <ul className="post-list">
        {visible.map((post) => (
          <li key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <Link to={`/?author=${encodeURIComponent(post.authorName)}`} className="tag">
              {post.authorName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}