const express = require("express");
const cors = require("cors");
const fishermenroute = require("./routes/fishermenRoute");
const boatRoute = require("./routes/boatRoute");
const queryRoute = require("./routes/queryRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/fishermen", fishermenroute);
app.use("/boats", boatRoute);
app.use("/query", queryRoute);

module.exports = app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on http://localhost:5000");
});
