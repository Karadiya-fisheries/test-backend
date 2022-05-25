const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  // Save User to Database
  // async email

  User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      jwt.sign(
        {
          id: user.uid,
        },
        config.email_secret,
        {
          expiresIn: "1d",
        },
        (err, emailToken) => {
          const url = `http://localhost:5000/confirmation/${emailToken}`;

          config.transporter.sendMail(
            {
              from: "7tharindugalle@gmail.com",
              to: user.email,
              subject: "Confirm Email - Karadiya",
              html: `
              <h2>E-Mail account confirmation</h2>
              <p>This email was sent because you signed up for Karadya fisheires. Before you signed in, you need to confirm the email address you 've given us in your registration</p>
              Please click this link to confirm your email: <a href="${url}">${url}</a>
              `,
            },
            (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message %s sent: %s", info.messageId, info.response);
            }
          );
        }
      );
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!user.confirm) {
        return res
          .status(404)
          .send({ message: "Please Confirm email before login" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          uid: user.uid,
          phone: user.phone,
          fullname: user.fullname,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.forgot_password = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    },
  }).then((user) => {
    if (!user || !user.confirm) {
      config.transporter.sendMail(
        {
          from: "7tharindugalle@gmail.com",
          to: req.body.email,
          subject: "Forgot Password - Karadiya",
          html: `
          <html>
          <head>
            <style>
            body {background-color: #DBDFFD;}
              p {font-family: "tahoma";}
              h2 {font-family: "Helvetica"}
              b {color: #242F9B}
            </style>
          </head>
          <body>

          <h2>Forgot Password</h2>
                    <p>You (or someone else) entered this email address when trying to change the password of <b>A Karadiya Account</b>. </p>
                    <p>However, email address is <b>not</b> on our database of registered or email confirmed users and therefore the attempted password change has failed. </p>
                    <p>If you are A Karadiya User, Please try again using the same email address you gave when opening your account.</p>
                    <p>If you are <b>not</b> A Karadiya User, Please ignore this email.</p>
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
          console.log("Message %s sent: %s", info.messageId, info.response);
        }
      );
      return res
          .status(404)
          .send({ message: "Email is not recognized on database,\n For more infromation check the email" });
    }

    jwt.sign(
      {
        id: user.uid,
      },
      config.email_secret,
      {
        expiresIn: "1d",
      },
      (err, emailToken) => {
        const url = `http://localhost:3000/reset_password/${emailToken}`;

        config.transporter.sendMail(
          {
            from: "7tharindugalle@gmail.com",
            to: user.email,
            subject: "Forgot Password - Karadiya",
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

            <h2>Reset Password</h2>
                      <p>We've sent this message because you requested that your Karadiya Account password be rest. To get back into your Karadiya Account you'll need to create <b>a new password</b>. </p>
                                <p>Here's how you do that: </p>
                                <ol>
                                <li>Click the link below to open a new browser window.</li>
                                <li>Enter the requested information and follow the instructions to reset your password.</li></ol>
                                <hr>
                                <p>Reset your password now:</p>
                                <a href="${url}">${url}</a>
                                <p>If you have any further inquiries, Please inform us!</p>

            </body>
            </html>
            `,
          },
          (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message %s sent: %s", info.messageId, info.response);
          }
          
        );

        res.status(200).send({ message: "Email Sent" });
      }
    );

  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.reset_password = (req,res) => {
  try {
    jwt.verify(req.params.token, config.email_secret, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      const id = decoded.id;
      const pass = bcrypt.hashSync(req.body.password, 8);
      User.update({ password: pass }, { where: { uid: id } })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(304).json({ message: err });
        });
    });
    res.end();
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
}