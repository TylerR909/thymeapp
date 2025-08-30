import { AuthProvider, useAuth } from '@mobile/services/auth/AuthProvider';
import { DbSandbox } from '@mobile/services/db/DbSandbox';
import { useMigrations } from '@mobile/services/db/useMigrations';
import { GeoProvider } from '@mobile/services/GeoLocation/GeoProvider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  useMigrations();
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <AppStack />;
  return (
    <DbSandbox>
      <GeoProvider>
        <AppStack />
      </GeoProvider>
    </DbSandbox>
  );
};

const AppStack = () => (
  <Stack initialRouteName="(auth)">
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="(profile)" options={{ headerShown: false }} />
    <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
  </Stack>
);
