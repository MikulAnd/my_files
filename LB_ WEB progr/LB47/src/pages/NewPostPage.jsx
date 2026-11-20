import PostForm from '../components/PostForm';

export default function NewPostPage() {
  return (
    <section>
      <h1>Новий пост</h1>
      <PostForm submitLabel="Опублікувати" cancelTo="/" />
    </section>
  );
}