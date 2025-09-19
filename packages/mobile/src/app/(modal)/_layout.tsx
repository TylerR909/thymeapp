import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen name="checkin" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
