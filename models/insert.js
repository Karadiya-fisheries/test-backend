const pool = require("./connect");

const insert = async (text, values) => {
  try {
    const res = await pool.query(text, values);
    return res;
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = insert;
