import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '.';
import { ping } from './schema';

export const DbSandbox = () => {
  useLiveQuery(db.select().from(ping));
  return null;
};
