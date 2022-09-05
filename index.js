const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const { createServer } = require("http");
const { Server } = require("socket.io");
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
const chatRoute = require("./routes/chat.routes");
const lotRoute = require("./routes/lot.routes");
const bidRoute = require("./routes/bid.routes");
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

db.sequelize.sync();
// ({ alter: true }).then(() => {
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "owner",
//   });

//   Role.create({
//     id: 3,
//     name: "officer",
//   });
//   Role.create({
//     id: 4,
//     name: "bidder",
//   });
// }

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
app.use("/chat", chatRoute);
app.use("/bidder", bidRoute);
app.use("/lot", lotRoute);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://karadiya-dashboard.web.app",
      "https://karadiya-store.web.app",
    ],
  },
});
const controller = require("./controllers/socket.controller");

var user = new Map();
controller.newSocketConn(io, user);
console.log(user);

httpServer.listen(process.env.PORT || 5000, () => {
  console.log("Server started on http://localhost:5000");
});
