import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProfileLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push('/(profile)/settings');
              }}
              style={{ marginRight: 16, padding: 8 }}
            >
              <Ionicons name="settings" size={28} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
      <Stack.Screen name="friends/index" options={{ title: 'Friends' }} />
      <Stack.Screen name="add-friend/index" options={{ title: 'Add Friend' }} />
      <Stack.Screen name="friend-profile/index" options={{ title: 'Friend Profile' }} />
    </Stack>
  );
}
