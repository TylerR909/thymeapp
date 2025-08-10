import { useAuth } from '@mobile/services/auth/AuthProvider';
import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={login} />
      <Button
        title="Register"
        onPress={() => {
          router.push('/(auth)/register');
        }}
      />
    </View>
  );
}
