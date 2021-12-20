const express = require("express");
const router = express.Router();
const {
  userDetails,
  postTwit,
  likeTwit,
  getAllTwits,
  getTwit,
  deleteTwit,
  userSetting,
} = require("../controllers/user.controller");
const {
  refreshToken
} = require("../controllers/auth.controller");

const { authJwt } = require("../middlewares");

router.get("/dashboard/:userID", [authJwt.isActive, authJwt.verifyToken], userDetails);
router.get("/getAllTwits", [authJwt.isActive, authJwt.verifyToken], getAllTwits);

router.post("/refreshToken", refreshToken);

router.post("/postTwit", [authJwt.isActive, authJwt.verifyToken], postTwit);

router.post("/likeTwit", [authJwt.isActive, authJwt.verifyToken], likeTwit);
router.post("/getTwit", [authJwt.isActive, authJwt.verifyToken], getTwit);

router.delete("/deleteTwit", [authJwt.isActive, authJwt.verifyToken], deleteTwit);

router.post("/updateSetting", [authJwt.isActive, authJwt.verifyToken], userSetting);



module.exports = router;
