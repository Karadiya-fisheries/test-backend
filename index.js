const express = require("express");
const cors = require("cors");
const pg = require("pg");
const fishermenroute = require("./routes/fishermenRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/fishermen", fishermenroute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on http://localhost:5000");
});
