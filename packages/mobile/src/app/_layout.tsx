import { useMigrations } from '@mobile/services/db/useMigrations';
import { Stack } from 'expo-router';

export default function RootLayout() {
  useMigrations();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
