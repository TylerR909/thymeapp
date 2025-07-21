import migrations from '@mobile/../drizzle/migrations';
import { useMigrations as _useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '.';

export const useMigrations = () => {
  _useMigrations(db, migrations);
};
