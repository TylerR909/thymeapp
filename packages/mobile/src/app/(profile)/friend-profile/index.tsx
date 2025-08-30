import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function FriendProfile() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Friend Profile Screen</Text>
      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
