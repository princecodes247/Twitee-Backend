const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//check for duplicate name or email
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    userName: req.body.userName
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(200).send({ 
        message: "Failed! Username is already in use!",
        mark: "username" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(200).send({ message: "Failed! Email is already in use!",
        mark: "username" });
        return;
      }

      next();
    });
  });
};

//check role existence
checkRolesExisted = (req, res, next) => {
  if(req.body.role) {
    if(req.body.role == "user" || req.body.role == "admin"){
      next();
    }
    res.status(400).send({
      message: `Failed! Role ${req.body.role} does not exist!`
    });
    return;
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;