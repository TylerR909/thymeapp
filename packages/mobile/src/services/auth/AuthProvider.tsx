import { Redirect, useRouter } from 'expo-router';
import React, { useContext } from 'react';

type AuthContext = {
  login: VoidFunction;
  logout: VoidFunction;
  isLoggedIn: boolean;
  user: unknown;
};

const AuthContext = React.createContext<AuthContext>({
  login() {},
  logout() {},
  isLoggedIn: false,
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<object | null>(null);
  const isLoggedIn = !!user;

  const login = () => {
    // Logic to log in the user
    console.log('login');
    setUser({ name: 'John Doe' }); // Example user data
  };

  const logout = () => {
    // Logic to log out the user
    console.log('logout');
    setUser(null);
    // Force navigation reset
    router.push('/(auth)/login');
  };

  console.log({ isLoggedIn, user });

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, user }}>
      {isLoggedIn ?
        <Redirect href="/(tabs)/feed" />
      : null}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
