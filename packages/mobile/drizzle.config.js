import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './src/services/db/schema',
  out: './drizzle',
  casing: 'snake_case',
});
