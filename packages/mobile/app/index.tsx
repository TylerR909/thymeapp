import { Text, View } from "react-native";
import { GeoProvider } from "./_services/GeoLocation/GeoProvider";

export default function Index() {
  return (
    <GeoProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </GeoProvider>
  );
}
