import { useMigrations } from '@mobile/services/db/useMigrations';
import { Stack } from 'expo-router';

export default function RootLayout() {
  useMigrations();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
