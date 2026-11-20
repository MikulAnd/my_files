import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error) ? `Помилка ${error.status}` : 'Неочікувана помилка';
  const message = isRouteErrorResponse(error) ? error.data : 'Спробуйте оновити сторінку';

  return (
    <section className="content">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">На головну</Link>
    </section>
  );
}