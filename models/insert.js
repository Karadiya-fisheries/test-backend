const client = require("./connect");

const insert = async (text, values) => {
  try {
    const res = await client.query(text, values);
    console.log("Data insert successful");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.end();
  }
};

module.exports = insert;
