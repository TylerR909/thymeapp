import { Text, View } from 'react-native';
import { DbSandbox } from '../services/db/DbSandbox';
import { useMigrations } from '../services/db/useMigrations';
import { GeoProvider } from '../services/GeoLocation/GeoProvider';

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
