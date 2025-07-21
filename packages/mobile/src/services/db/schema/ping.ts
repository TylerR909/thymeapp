import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { currentTimestamp, timestamps } from './common';

export const ping = sqliteTable('pings', {
  id: integer().primaryKey(),
  /** Once the record is synced to the backend, its remote ID */
  // remote_id: integer(),
  timestamp: currentTimestamp().notNull(),
  latitude: real().notNull(),
  longitude: real().notNull(),
  accuracy: real(),
  altitude: real(),
  speed: real(),
  ...timestamps,
});

export type Ping = typeof ping.$inferSelect;
