const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const fishermenRoute = require("./routes/fishermen.routes");
const boatRoute = require("./routes/boat.routes");
const catchRoute = require("./routes/catch.routes");
const departureRoute = require("./routes/departure.routes");
const triplogRoute = require("./routes/triplog.routes");
const ownerRoute = require("./routes/owner.routes");
const statRoute = require("./routes/stat.routes");
const queryRoute = require("./routes/query.routes");
const profileRoute = require("./routes/profile.routes");
const noticeRoute = require("./routes/notice.routes");
const activityRoute = require("./routes/actitvity.routes");

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
const { owner } = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "owner",
  });

  Role.create({
    id: 3,
    name: "officer",
  });
}

app.use("/fishermen", fishermenRoute);
app.use("/boat", boatRoute);
app.use("/catch", catchRoute);
app.use("/departure", departureRoute);
app.use("/owner", ownerRoute);
app.use("/triplog", triplogRoute);
app.use("/stat", statRoute);
app.use("/query", queryRoute);
app.use("/profile", profileRoute);
app.use("/notice", noticeRoute);
app.use("/activity", activityRoute);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

module.exports = app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on http://localhost:5000");
});
