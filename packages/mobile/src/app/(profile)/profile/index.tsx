import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Text>Settings available in header</Text>
      <Button
        title="Friends"
        onPress={() => {
          router.push('/(profile)/friends');
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
