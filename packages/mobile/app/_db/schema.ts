import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "pings",
      columns: [
        { name: "latitude", type: "number" },
        { name: "longitude", type: "number" },
        { name: "timestamp", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
