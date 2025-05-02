import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Platform } from "react-native";

import schema from "./schema";
import migrations from "./migrations";
import Ping from "./models/Ping";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  // ...(Platform.OS === "ios" && { jsi: true }),
  dbName: "thymeapp",
  onSetUpError: (error) => {
    console.error("onSetUpError");
    console.error(error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Ping],
});
