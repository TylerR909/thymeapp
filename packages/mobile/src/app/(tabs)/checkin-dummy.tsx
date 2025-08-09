import { Redirect } from 'expo-router';

/**
 * Perhaps this file/component shouldn't even exist but it should redirect back to the Feed component,
 * as "Checkin" inasmuch as the Tabs bar is concerned should pop open the `(modal)/checkin/index.tsx`
 * modal, not an individual page.
 */
export default function CheckinDummy() {
  return <Redirect href={{ pathname: '/(tabs)/feed' }} />;
}
