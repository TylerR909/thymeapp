import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';
import { useMigrations } from '@mobile/services/db/useMigrations';
import { TransitionSpecs } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export const unsable_settings = {
  initialRouteName: 'settings',
};

export default function RootLayout() {
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
        {/* <Tabs.Screen name="index" options={{ title: 'Home' }} redirect /> */}
        <Tabs.Screen name="feed" options={{ tabBarIcon: () => <Ionicons name="list" size={24} /> }} />
        <Tabs.Screen
          name="checkin/index"
          options={{
            tabBarIcon: () => <AntDesign name="pluscircle" style={styles.checkinButtonIcon} size={48} />,
            animation: 'shift',
            freezeOnBlur: true,
            transitionSpec: TransitionSpecs.ShiftSpec,
          }}
        />
        <Tabs.Screen name="review" options={{ tabBarIcon: () => <Fontisto name="pie-chart-2" size={24} /> }} />
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
