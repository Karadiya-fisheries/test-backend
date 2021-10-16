const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres" || process.env.PGUSER,
  host: "localhost" || process.env.PGHOST,
  database: "testdb" || process.env.PGDATABASE,
  password: "testdb" || process.env.PGPASSWORD,
  port: 5432 || process.env.PGPORT,
});

module.exports = pool;
