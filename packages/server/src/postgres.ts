/** Compose service name on the Docker network. */
const POSTGRES_HOSTNAME = 'postgres';
const POSTGRES_PORT = 5432;

const missingDbEnv = (): string[] =>
  (['DB_USER', 'DB_PASSWORD', 'DB_DATABASE'] as const).filter(key => {
    const value = process.env[key];
    return value === undefined || value === '';
  });

let client: Bun.SQL | undefined;

const postgres = (): Bun.SQL => {
  const missing = missingDbEnv();
  if (missing.length > 0) {
    throw new Error(`Postgres env missing: ${missing.join(', ')}`);
  }
  client ??= new Bun.SQL({
    adapter: 'postgres',
    hostname: POSTGRES_HOSTNAME,
    port: POSTGRES_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    max: 2,
    connectionTimeout: 3,
  });
  return client;
};

/** Throws if Postgres is unreachable or credentials env is incomplete. */
export const pingPostgres = async (): Promise<void> => {
  await postgres()`SELECT 1`;
};

export const postgresEndpoint = {
  hostname: POSTGRES_HOSTNAME,
  port: POSTGRES_PORT,
} as const;
