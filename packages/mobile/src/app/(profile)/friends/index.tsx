import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Friends() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Friends Screen</Text>
      <Button
        title="Add Friend"
        onPress={() => {
          router.push('/(profile)/add-friend');
        }}
      />
      <Button
        title="Friend Profile"
        onPress={() => {
          router.push('/(profile)/friend-profile');
        }}
      />
      <Button
        title="Settings"
        onPress={() => {
          router.push('/(profile)/settings');
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
