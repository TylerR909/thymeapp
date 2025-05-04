import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { View, Text, Button } from "react-native";
import { useToggle } from "@mobile/utils/hooks/useToggle";

/**
 * For the most part Geo Services run in the background and update the database with time-series
 * data, however some ReactNative integration is required:
 * 1. Kick off tasks
 * 2. Request and enforce Permissions
 * 3. pseudo auth-layer if Permissions are not available
 */

export const GeoProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [t, toggle] = useToggle();
  const [status, requestPermission, getPermission] =
    Location.useForegroundPermissions({ request: true });
  const [status2, requestPermission2, getPermission2] =
    Location.useBackgroundPermissions({ request: true });

  const [geoLoc, setGeoLoc] = useState<Location.LocationObject | null>();
  const [postal, setPostal] = useState<
    Location.LocationGeocodedAddress[] | null
  >();
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({
        timeInterval: EVERY_MINUTE_MS,
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 50,
      });
      setGeoLoc(location);
      const postal = await Location.reverseGeocodeAsync(location.coords);
      setPostal(postal);
    })();
  }, [t]);

  const { coords, timestamp } = geoLoc ?? {};
  return (
    <>
      {children}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!geoLoc ? (
          <Text>Test Component!</Text>
        ) : (
          <Text>
            Location at {new Date(timestamp!).toLocaleTimeString()} was{" "}
            {coords?.latitude} {coords?.longitude} ({coords?.accuracy})
          </Text>
        )}
        <Button title="Refetch" onPress={toggle} />
      </View>
    </>
  );
};

const EVERY_MINUTE_MS = 1000 * 60;
