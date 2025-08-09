import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Profile() {
  const params = useLocalSearchParams();
  console.log({ params });
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
