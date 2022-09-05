const router = require("express").Router();
const { owner, user } = require("../models");
const db = require("../models");
const config = require("../config/auth.config");
const catchModel = db.catch;
const TripLog = db.triplog;
const Boat = db.boat;

router.get("/", async (req, res) => {
  TripLog.findAll({ include: { all: true } })
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/:id", async (req, res) => {
  TripLog.findOne({
    where: {
      tripId: req.params.id,
    },
    include: { all: true },
  })
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.patch("/accept/:id", async (req, res) => {
  TripLog.findByPk(req.params.id)
    .then((record) => {
      (record.confirm = req.body.confirm),
        record.save().then((updatetriplog) => {
          Boat.findOne({
            attributes: ["BoatName"],
            where: {
              BoatRg: updatetriplog.WesselID,
            },
            include: [
              {
                attributes: ["OwnerId"],
                model: owner,
                include: [
                  {
                    model: user,
                    attributes: ["email", "fullname", "profileUrl"],
                  },
                ],
              },
            ],
          }).then((boat) => {
            config.transporter.sendMail(
              {
                from: "7tharindugalle@gmail.com",
                to: boat.owner.user.email,
                subject: "Regarding Trip Log - Karadiya",
                html: `
              <html>
              <head>
                <style>
                body {background-color: #DBDFFD;}
                  p ,li {font-family: "tahoma";}
                  h2 {font-family: "Helvetica"}
                  b {color: #242F9B}
                </style>
              </head>
              <body>

              <h2>Trip Log "${boat.BoatName}"</h2>
              <h5>Dear, Mr."${boat.owner.user.fullname}"</h5>
                        <p>We've sent this message to inform you that the boat you owned called "${boat.BoatName}" has submitted A TripLog </p>
                                  <p> And It has been accepted to the system, You can view the Trip log records in your dashboard </p>
                                  <hr>
                                  <p>If you have any further inquiries, Please inform us!</p>

              </body>
              </html>
              `,
              },
              (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log(
                  "Message %s sent: %s",
                  info.messageId,
                  info.response
                );
              }
            );
            // res.json(boat);
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.patch("/reject/:id", async (req, res) => {
  TripLog.findByPk(req.params.id)
    .then((record) => {
      (record.confirm = req.body.confirm),
        record.save().then((updatetriplog) => {
          Boat.findOne({
            attributes: ["BoatName"],
            where: {
              BoatRg: updatetriplog.WesselID,
            },
            include: [
              {
                attributes: ["OwnerId"],
                model: owner,
                include: [
                  {
                    model: user,
                    attributes: ["email", "fullname", "profileUrl"],
                  },
                ],
              },
            ],
          }).then((boat) => {
            config.transporter.sendMail(
              {
                from: "7tharindugalle@gmail.com",
                to: boat.owner.user.email,
                subject: "Regarding Trip Log - Karadiya",
                html: `
              <html>
              <head>
                <style>
                body {background-color: #DBDFFD;}
                  p ,li {font-family: "tahoma";}
                  h2 {font-family: "Helvetica"}
                  b {color: #242F9B}
                </style>
              </head>
              <body>

              <h2>Trip Log "${boat.BoatName}"</h2>
              <h5>Dear, Mr."${boat.owner.user.fullname}"</h5>
                        <p>We've sent this message to inform you that the boat you owned called "${boat.BoatName}" has submitted A TripLog </p>
                                  <p> And It has been rejected by fishery officer, You can view the Trip log records in your dashboard </p>
                                  <hr>
                                  <p>If you have any further inquiries, Please inform us!</p>

              </body>
              </html>
              `,
              },
              (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log(
                  "Message %s sent: %s",
                  info.messageId,
                  info.response
                );
              }
            );
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

// create TripLog
router.post("/", (req, res) => {
  Boat.findOne({
    where: { BoatRg: req.body.WesselID },
  }).then((boat) => {
    console.log(boat);
    TripLog.create({
      boatBoatId: boat.boatId,
      WesselID: req.body.WesselID,
      SkipperID: req.body.SkipperID,
      Harbor: req.body.Harbor,
      DepartureDate: req.body.DepartureDate,
      DepartureTime: req.body.DepartureTime,
      GearType: req.body.GearType,
      MainLine: req.body.MainLine,
      BranchLine: req.body.BranchLine,
      HookNo: req.body.HookNo,
      HookTypes: req.body.HookTypes,
      Depth: req.body.Depth,
      Bait: req.body.Bait,
    })
      .then((newboat) => {
        res.status(201).json(newboat);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  });
});

//update a

router.patch("/:id", async (req, res) => {
  TripLog.findByPk(req.params.id)
    .then((record) => {
      record.name = req.body.name;
      record.FishermenID = req.body.ownerID;

      record.save().then((updatetriplog) => {
        res.json(updatetriplog);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a TripLog

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedboat = await TripLog.destroy({
      where: {
        fishermenId: id,
      },
    });
    res.status(201).json(deletedboat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a TripLog

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await TripLog.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
