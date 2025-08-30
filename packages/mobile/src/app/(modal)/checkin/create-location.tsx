import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function CreateLocation() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create New Location</Text>
      <Text>Address/Name input fields would go here</Text>
      <Button
        title="Create Location"
        onPress={() => {
          router.replace('/(modal)/checkin?location=new-location');
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
