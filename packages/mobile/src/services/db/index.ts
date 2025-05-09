import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export * from './schema';

const expo = openDatabaseSync("thymeapp.db", { enableChangeListener: true });
export const db = drizzle(expo);

