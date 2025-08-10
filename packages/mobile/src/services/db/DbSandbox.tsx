import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useEffect, type PropsWithChildren } from 'react';
import { db } from '.';
import { ping } from './schema';

export const DbSandbox = ({ children }: PropsWithChildren) => {
  const { data } = useLiveQuery(db.select().from(ping));
  useEffect(() => {
    console.log('DbSandbox mounted', data);
  }, []);
  // console.log( data);
  return children;
};
