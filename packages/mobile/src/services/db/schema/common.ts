import { sql } from 'drizzle-orm';
import { text } from 'drizzle-orm/sqlite-core';

export const currentTimestamp = () => text().default(sql`(CURRENT_TIMESTAMP)`);

export const timestamps = {
  updated_at: currentTimestamp(),
  created_at: currentTimestamp(),
  // deleted_at: currentTimestamp(),
};
