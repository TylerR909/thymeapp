import { db, ping } from '@mobile/services/db';
import * as Location from 'expo-location';
import React, { useEffect } from 'react';

/**
 * For the most part Geo Services run in the background and update the database with time-series
 * data, however some ReactNative integration is required:
 * 1. Kick off tasks
 * 2. Request and enforce Permissions
 * 3. pseudo auth-layer if Permissions are not available
 */

export const GeoProvider = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    void (async () => {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({
        timeInterval: EVERY_MINUTE_MS,
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 50,
      });
      const postal = await Location.reverseGeocodeAsync(location.coords);

      console.log(postal[0]);

      await db.insert(ping).values({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        speed: location.coords.speed,
      });
    })();
  }, []);

  return children;
};

const EVERY_MINUTE_MS = 1000 * 60;
