const client = require("./connect");

const text = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
const values = ["brianc", "brian.m.carlson@gmail.com"];

const query = async (text, values) => {
  try {
    const res = await client.query(text, values);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = query;
