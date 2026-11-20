import { createContext, useContext, useState } from 'react';
import { getCurrentUser, saveCurrentUser } from '../auth/session';
import { loginOrRegister } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser);

  async function login(name, password) {
    const loggedIn = await loginOrRegister(name, password);
    saveCurrentUser(loggedIn);
    setUser(loggedIn);
  }

  function logout() {
    saveCurrentUser(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth потрібно викликати всередині AuthProvider');
  return ctx;
}