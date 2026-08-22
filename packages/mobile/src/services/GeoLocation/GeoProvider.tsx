import { count } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useToggle } from '../../utils/hooks/useToggle';
import { db, ping } from '../db';

/**
 * For the most part Geo Services run in the background and update the database with time-series
 * data, however some ReactNative integration is required:
 * 1. Kick off tasks
 * 2. Request and enforce Permissions
 * 3. pseudo auth-layer if Permissions are not available
 */

export const GeoProvider = ({ children }: React.PropsWithChildren) => {
  const [t, toggle] = useToggle();
  Location.useForegroundPermissions({ request: true });
  Location.useBackgroundPermissions({ request: true });

  const [geoLoc, setGeoLoc] = useState<Location.LocationObject | null>();
  useEffect(() => {
    void (async () => {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({
        timeInterval: EVERY_MINUTE_MS,
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 50,
      });
      setGeoLoc(location);
      await Location.reverseGeocodeAsync(location.coords);

      await db.insert(ping).values({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        speed: location.coords.speed,
      });
    })();
  }, [t]);

  const numPings = useLiveQuery(db.select({ count: count() }).from(ping));
  const coords = geoLoc?.coords;
  const timestamp = geoLoc?.timestamp;

  return (
    <>
      {children}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!geoLoc || timestamp === undefined ?
          <Text>Test Component!</Text>
        : <>
            <Text>{numPings.data[0]?.count} total pings</Text>
            <Text>
              Location at {Temporal.Instant.fromEpochMilliseconds(timestamp).toLocaleString()} was {coords?.latitude}{' '}
              {coords?.longitude} ({coords?.accuracy})
            </Text>
          </>
        }
        <Button title="Refetch" onPress={toggle} />
      </View>
    </>
  );
};

const EVERY_MINUTE_MS = 1000 * 60;
