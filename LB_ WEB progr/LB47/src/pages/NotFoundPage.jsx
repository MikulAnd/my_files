import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section>
      <h1>404 — сторінку не знайдено</h1>
      <Link to="/">На головну</Link>
    </section>
  );
}