import { AuthProvider, useAuth } from '@mobile/services/auth/AuthProvider';
import { DbSandbox } from '@mobile/services/db/DbSandbox';
import { useMigrations } from '@mobile/services/db/useMigrations';
import { GeoProvider } from '@mobile/services/GeoLocation/GeoProvider';
import { Stack } from 'expo-router';
import type React from 'react';

export default function RootLayout() {
  useMigrations();
  return (
    <AuthProvider>
      <AuthedProviders>
        <Stack initialRouteName="(auth)">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
        </Stack>
      </AuthedProviders>
    </AuthProvider>
  );
}

const AuthedProviders = ({ children }: React.PropsWithChildren) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return children;

  return (
    <DbSandbox>
      <GeoProvider>{children}</GeoProvider>
    </DbSandbox>
  );
};
