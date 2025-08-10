import { useAuth } from '@mobile/services/auth/AuthProvider';
import { Button, Text, View } from 'react-native';

export default function Feed() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
