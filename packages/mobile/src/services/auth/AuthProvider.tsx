import { useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';

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
    // router.replace('/(tabs)/feed');
  };

  const logout = () => {
    // Logic to log out the user
    console.log('logout');
    // router.replace('/(auth)/login');
    setUser(null);
  };

  /** Handle isLoggedIn redirects */
  useEffect(() => {
    // useEffect is running "too fast" before the Stacks properly mounts, so delaying
    // any amount of time is enough to mount the Stack and redirect.
    setImmediate(() => {
      if (isLoggedIn) router.replace('/(tabs)/feed');
      else router.replace('/(auth)/login');
    });
  }, [isLoggedIn, router]);

  console.log({ isLoggedIn, user });

  return <AuthContext.Provider value={{ login, logout, isLoggedIn, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
