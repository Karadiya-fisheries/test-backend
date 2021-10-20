module.exports = {
  PORT: 5432 || process.env.PGPORT,
  HOST: "localhost" || process.env.PGHOST,
  USER: "postgres" || process.env.PGUSER,
  PASSWORD: "testdb" || process.env.PGPASSWORD,
  DB: "testdb" || process.env.PGDATABASE,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
