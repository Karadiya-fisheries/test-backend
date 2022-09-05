const router = require("express").Router();
const db = require("../models");
const Departure = db.departure;
const Boat = db.boat;
const owner = db.owner;
const user = db.user;
const config = require("../config/auth.config");

router.get("/", async (req, res) => {
  Departure.findAll({ order: [["DepartureId"]] })
    .then((departure) => {
      res.json(departure);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.patch("/accept/:id", async (req, res) => {
  Departure.findByPk(req.params.id)
    .then((record) => {
      (record.confirm = req.body.confirm),
        record.save().then((updateDeparture) => {
          Boat.findOne({
            attributes: ["BoatName"],
            where: {
              BoatRg: updateDeparture.Imul,
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
                subject: "Regarding Departure Request - Karadiya",
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
                        <p>We've sent this message to inform you that the boat you owned called "${boat.BoatName}" has submitted Requset for Departure Approval</p>
                                  <p> And It has been accepted by the fishery officers, You can view the Approval request in your dashboard </p>
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
            res.json(boat);
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.patch("/reject/:id", async (req, res) => {
  Departure.findByPk(req.params.id)
    .then((record) => {
      (record.confirm = req.body.confirm),
        record.save().then((updateDeparture) => {
          Boat.findOne({
            attributes: ["BoatName"],
            where: {
              BoatRg: updateDeparture.Imul,
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
                subject: "Regarding Departure Request - Karadiya",
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
                        <p>We've sent this message to inform you that the boat you owned called "${boat.BoatName}" has submitted Requset for Departure Approval</p>
                                  <p> And It has been rejected by the fishery officers, You can view the Approval request in your dashboard </p>
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
            res.json(boat);
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

// create departure
router.post("/", (req, res) => {
  Boat.findOne({
    where: {
      BoatRg: req.body.Imul,
    },
  }).then((boat) => {
    Departure.create({
      boatBoatId: boat.boatId,
      Imul: req.body.Imul,
      OwnerName: req.body.OwnerName,
      TelNo: req.body.TelNo,
      Email: req.body.Email,
      SkipperName: req.body.SkipperName,
      SkipperNic: req.body.SkipperNic,
      SkipperNo: req.body.SkipperNo,
      DepartingPort: req.body.DepartingPort,
      FishingZone: req.body.FishingZone,
      MLength: req.body.MLength,
      NoThrons: req.body.NoThrons,
      CNetLength: req.body.CNetLength,
      CEyeSize: req.body.CEyeSize,
      NettingLength: req.body.NettingLength,
      NetEyeSize: req.body.NetEyeSize,
      CrewDetails: req.body.CrewDetails,
      LocalOpLicense: req.body.LocalOpLicense,
      InterOpLicense: req.body.InterOpLicense,
      RadioStation: req.body.RadioStation,
      Frequency: req.body.Frequency,
      Vms: req.body.Vms,
    })
      .then((newDeparture) => {
        res.status(201).json(newDeparture);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  });
});

// //update a departure

router.put("/:id", async (req, res) => {
  Departure.findByPk(req.params.id)
    .then((departure) => {
      (departure.imulNumber = req.body.imulNumber),
        (departure.fullName = req.body.fullName),
        (departure.phone = req.body.phone),
        (departure.email = req.body.email),
        (departure.boatId = req.body.boatId);

      departure.save().then((updateDeparture) => {
        res.json(updateDeparture);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// //delete a departure

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDeparture = await Departure.destroy({
      where: {
        DepartureId: id,
      },
    });
    res.status(201).json(deletedDeparture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a departure

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Departure.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get/:departureId", async (req, res) => {
  const departureId = req.params.departureId;
  try {
    const result = await Departure.findOne({
      where: {
        departureId: departureId,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
