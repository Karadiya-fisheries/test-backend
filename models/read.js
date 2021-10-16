const pool = require("./connect");

const read = async (query) => {
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = read;
