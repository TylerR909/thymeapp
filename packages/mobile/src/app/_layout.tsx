import { AuthProvider, useAuth } from '@mobile/services/auth/AuthProvider';
import { DbSandbox } from '@mobile/services/db/DbSandbox';
import { useMigrations } from '@mobile/services/db/useMigrations';
import { GeoProvider } from '@mobile/services/GeoLocation/GeoProvider';
import { Stack } from 'expo-router';
import { type PropsWithChildren } from 'react';

export default function RootLayout() {
  useMigrations();
  return (
    <AuthProvider>
      <AuthProtectedProviders>
        <Stack /* initialRouteName='(auth)' does nothing, nor does unstable_settings */>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
        </Stack>
      </AuthProtectedProviders>
    </AuthProvider>
  );
}

const AuthProtectedProviders = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? children : (
      <DbSandbox>
        <GeoProvider>{children}</GeoProvider>
      </DbSandbox>
    );
};
