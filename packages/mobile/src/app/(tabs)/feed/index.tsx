import { db, ping } from '@mobile/services/db';
import { desc } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { FlatList, Text, View } from 'react-native';

export default function Feed() {
  const pings = useLiveQuery(db.select().from(ping).orderBy(desc(ping.timestamp)).limit(100));
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <FlatList
        data={pings.data}
        renderItem={ping => <Text>{ping.item.timestamp}</Text>}
        keyExtractor={i => i.timestamp}
      />
    </View>
  );
}
