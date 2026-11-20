import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function UserBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Link to="/login" className="nav__link">Увійти</Link>;

  return (
    <div className="user-bar">
      <span>{user.name}</span>
      <button onClick={() => { logout(); navigate('/'); }}>Вийти</button>
    </div>
  );
}