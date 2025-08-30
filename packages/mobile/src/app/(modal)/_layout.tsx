import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen name="checkin" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="checkin/success" options={{ title: 'Success', presentation: 'modal' }} />
      <Stack.Screen name="checkin/search" options={{ title: 'Search Location', presentation: 'modal' }} />
      <Stack.Screen name="checkin/create-location" options={{ title: 'Create Location', presentation: 'modal' }} />
    </Stack>
  );
}
