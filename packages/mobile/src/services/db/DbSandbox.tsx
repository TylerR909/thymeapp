import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { db } from '.';
import { ping } from './schema';

export const DbSandbox = () => {
  const { data } = useLiveQuery(db.select().from(ping));
  // console.log( data);
  return null;
};
