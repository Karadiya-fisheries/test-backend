const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const fishermenRoute = require("./routes/fishermenRoute");
const boatRoute = require("./routes/boatRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: "secret", saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.use("/fishermen", fishermenRoute);
app.use("/boat", boatRoute);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

module.exports = app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on http://localhost:5000");
});
