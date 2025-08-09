import { Stack } from 'expo-router';

export default function CheckinLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Check In', presentation: 'modal' }} />
      <Stack.Screen name="search" options={{ title: 'Search Location' }} />
    </Stack>
  );
}
