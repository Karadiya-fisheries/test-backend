// const createtable = require("./table");

// const query = `
// CREATE TABLE boat (
//     owner_id varchar,
//     boat_id varchar,
//     name varchar,
//     reg_data date
// );
// `;

// createtable(query).then(() => {
//   console.log("Boat table created");
// });

// const inserttable = require("./insert");

// const query = `
// INSERT INTO users (email, firstName, lastName, age)
// VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
// `;

// inserttable(query);

const readtable = require("./read");

const query = `
SELECT *
FROM users
`;

readtable(query);
