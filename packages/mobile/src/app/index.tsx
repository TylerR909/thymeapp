import { DbSandbox } from '@mobile/services/db/DbSandbox';
import { useMigrations } from '@mobile/services/db/useMigrations';
import { GeoProvider } from '@mobile/services/GeoLocation/GeoProvider';
import { Text, View } from 'react-native';

export default function Index() {
  useMigrations();
  return (
    <GeoProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
      <DbSandbox />
    </GeoProvider>
  );
}
