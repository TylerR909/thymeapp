import { useMigrations as _useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from ".";
import migrations from "../../../drizzle/migrations";

export const useMigrations = () => {
  _useMigrations(db, migrations);
};
