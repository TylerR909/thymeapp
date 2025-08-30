import { useAuth } from '@mobile/services/auth/AuthProvider';
import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Settings() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button title="Logout" onPress={logout} />
      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
