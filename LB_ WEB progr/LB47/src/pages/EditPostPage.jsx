import { useLoaderData } from 'react-router';
import PostForm from '../components/PostForm';

export default function EditPostPage() {
  const post = useLoaderData();

  return (
    <section>
      <h1>Редагування поста</h1>
      <PostForm post={post} submitLabel="Зберегти зміни" cancelTo={`/posts/${post.id}`} />
    </section>
  );
}