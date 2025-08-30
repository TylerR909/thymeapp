import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function AddFriend() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Friend Screen</Text>
      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
