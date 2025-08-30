import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';
import { useMigrations } from '@mobile/services/db/useMigrations';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const router = useRouter();
  useMigrations();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { paddingBottom: insets.bottom, height: 64 },
        }}
      >
        <Tabs.Screen
          name="feed/index"
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="checkin-dummy"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="pluscircle" style={styles.checkinButtonIcon} size={48} color={color} />
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              router.push('/checkin');
            },
          }}
        />
        <Tabs.Screen
          name="summary/index"
          options={{
            tabBarIcon: ({ color }) => <Fontisto name="pie-chart-2" size={24} color={color} />,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  router.push('/(profile)/profile');
                }}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="person" size={24} color="#007AFF" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  checkinButtonIcon: {
    marginBottom: 16,
    width: 48 + 2 * 4, // 48 + (2 x borderWidth)
    height: 48 + 2 * 4, // 48 + (2 x borderWidth)
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 28,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
