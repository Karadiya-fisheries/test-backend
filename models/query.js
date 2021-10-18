const pool = require("./connect");

const query = async (text, values) => {
  try {
    const res = await pool.query(text, values);
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = query;
