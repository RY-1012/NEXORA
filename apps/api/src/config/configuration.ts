export const configuration = () => ({
  jwt: {
    secret: process.env['JWT_SECRET'] ?? 'dev-secret',
    accessTtl: Number(process.env['JWT_ACCESS_TTL'] ?? 900),
    refreshTtl: Number(process.env['JWT_REFRESH_TTL'] ?? 1209600)
  },
  database: {
    url: process.env['DATABASE_URL'] ?? 'postgres://postgres:postgres@localhost:5432/nexora'
  },
  redis: {
    url: process.env['REDIS_URL'] ?? 'redis://localhost:6379'
  }
});
