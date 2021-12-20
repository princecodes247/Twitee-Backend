const express = require("express");
const router = express.Router();
const {
  signinUser,
  signupUser,
  signoutUser,
  activateAccount
} = require("../controllers/auth.controller");

const { verifySignUp } = require("../middlewares");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail
  ],
  signupUser
);

router.post("/login", signinUser);
router.post("/emailActivate", activateAccount);
router.delete("/logout", signoutUser);

module.exports = router;