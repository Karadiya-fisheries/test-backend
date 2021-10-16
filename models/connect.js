const pg = require("pg");

const { Client } = require("pg");

const client = new Client({
  user: "postgres" || process.env.PGUSER,
  host: "localhost" || process.env.PGHOST,
  database: "testdb" || process.env.PGDATABASE,
  password: "testdb" || process.env.PGPASSWORD,
  port: 5432 || process.env.PGPORT,
});

client.connect();
client.once("connect", () => {
  console.log("Database connected ");
});

module.exports = client;
