import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import SuccessPopover from './SuccessPopover';

export default function Checkin() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckIn = () => {
    // Close modal and show success as popover
    router.dismissAll();
    setShowSuccess(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Check In Screen</Text>
      <Text>Preselected Location: Starbucks Downtown</Text>
      <Button title="Check In Here" onPress={handleCheckIn} />
      <Button
        title="Search for Different Location"
        onPress={() => {
          router.replace('/(modal)/checkin/search');
        }}
      />

      <SuccessPopover
        visible={showSuccess}
        location="Starbucks Downtown"
        onClose={() => {
          setShowSuccess(false);
        }}
      />
    </View>
  );
}
