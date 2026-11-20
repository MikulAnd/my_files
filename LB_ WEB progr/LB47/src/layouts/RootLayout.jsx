import { Outlet, useNavigation } from 'react-router';
import Navigation from '../components/Navigation';
import UserBar from '../components/UserBar';

export default function RootLayout() {
  const navigation = useNavigation();
  const isBusy = navigation.state !== 'idle';

  return (
    <div className="layout">
      <header className="header">
        <span className="logo">Мій блог</span>
        <Navigation />
        <UserBar />
      </header>
      {isBusy && <div className="loading-bar" />}
      <main className="content" style={{ opacity: isBusy ? 0.6 : 1 }}>
        <Outlet />
      </main>
      <footer className="footer">© 2026 Мій блог</footer>
    </div>
  );
}