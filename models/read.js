const client = require("./connect");

const read = async (query) => {
  try {
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.end();
  }
};

module.exports = read;
