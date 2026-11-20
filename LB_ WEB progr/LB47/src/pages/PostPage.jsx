import { Link, useLoaderData } from 'react-router';
import PostActions from '../components/PostActions';

export default function PostPage() {
  const post = useLoaderData();

  return (
    <article>
      <Link to="/">← Усі пости</Link>
      <h1>{post.title}</h1>
      <Link to={`/?author=${encodeURIComponent(post.authorName)}`} className="tag">
        {post.authorName}
      </Link>
      <p>{post.body}</p>
      <PostActions post={post} />
    </article>
  );
}