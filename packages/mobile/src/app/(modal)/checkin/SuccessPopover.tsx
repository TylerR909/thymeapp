import { useRouter } from 'expo-router';
import { Button, Modal, Text, View } from 'react-native';

interface SuccessPopoverProps {
  visible: boolean;
  location: string;
  onClose: () => void;
}

export default function SuccessPopover({ visible, location, onClose }: SuccessPopoverProps) {
  const router = useRouter();

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            minWidth: 250,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Success!</Text>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>You have checked in to {location}</Text>
          <Button title="Done" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
