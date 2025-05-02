import { Text, View } from "react-native";
import { GeoProvider } from "./_services/GeoLocation/GeoProvider";
import { DbProvider } from "./_db/DbProvider";

export default function Index() {
  return (
    <DbProvider>
      <GeoProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Thyme App</Text>
        </View>
      </GeoProvider>
    </DbProvider>
  );
}
