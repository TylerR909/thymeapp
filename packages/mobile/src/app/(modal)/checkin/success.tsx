import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function CheckinSuccess() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Success!</Text>
      <Text>You have checked in to Starbucks Downtown</Text>
      <Button
        title="Done"
        onPress={() => {
          router.dismissAll();
        }}
      />
    </View>
  );
}
