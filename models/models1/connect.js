const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres" || process.env.PGUSER,
  host: "localhost" || process.env.PGHOST,
  database: "testdb" || process.env.PGDATABASE,
  password: "testdb" || process.env.PGPASSWORD,
  port: 5432 || process.env.PGPORT,
});

// const { Client } = require("pg");

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     require: true,
//     rejectUnauthorized: false,
//   },
// });

// client.connect();

module.exports = pool;
