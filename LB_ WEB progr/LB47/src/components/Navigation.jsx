import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link');

export default function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="nav">
      <NavLink to="/" end className={linkClass}>Пости</NavLink>
      {user && <NavLink to="/posts/new" className={linkClass}>+ Новий пост</NavLink>}
      <NavLink to="/admin" className={linkClass}>Мої пости</NavLink>
      <NavLink to="/about" className={linkClass}>Про нас</NavLink>
    </nav>
  );
}