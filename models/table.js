const client = require("./connect");

const create = async (query) => {
  try {
    const res = await client.query(query);
    console.log("Table is successfully created");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.end();
  }
};

module.exports = create;
