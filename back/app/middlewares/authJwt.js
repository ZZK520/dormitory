const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

const db = require("../models");
const path = require("path");

const User = db.user;
verifyToken = (req, res, next) => {
  const respondData = {
    status: 200,
    data: {},
    error: "",
    msg: "",
  };
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      respondData.status=401;
      respondData.msg='Unauthorized!';
      respondData.error=err;
      res.json(respondData)
    }
    console.log('decoded',decoded);
    
    // User.findOne({ email: decoded.user }).exec(async function (err, data) {
    //   req.body.userId = data._id;
    //   console.log('req.body.userId',req.body.userId);
    //   next();
    // });

  });
};

isModerator = (req, res, next) => {
  User.findById(req.body.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("roles", roles);
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};
isAdmin = (req, res, next) => {
  console.log("req.body.userId isAdmin", req.body.userId);

  User.findById(req.body.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
