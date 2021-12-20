onst express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const {
    getAllUsers,
    getUser,
    changeUserBalance,
    deactivateAccount,
    toggleAutoIncrement
} = require("../controllers/admin.controllers");


router.use(function(req, res, next) {
res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
);
next();
});

router.get(
    "/getallusers",
    getAllUsers
);
// router.get(
//     "/getallusers",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     getAllUsers
// );
router.get(
    "/getuser",
    [authJwt.verifyToken, authJwt.isAdmin],
    getUser
);

router.post(
    "/changeuserbalance",
    [authJwt.verifyToken, authJwt.isAdmin],
    changeUserBalance
);

router.post(
    "/deactivateaccount",
    [authJwt.verifyToken, authJwt.isAdmin],
    deactivateAccount
);
router.post(
    "/toggleautoincrement",
    [authJwt.verifyToken, authJwt.isAdmin],
    toggleAutoIncrement);

module.exports = router;

//! TODO
