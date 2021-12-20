const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;
const Role = db.role;


//verify token
verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({
        message: "No token provided!"
      });
    }

    decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(401).json({
        message: "Token Expired"
      })
    } else {
      res.json({
        message: 'Authenticate Failed'
      });
    }
  }
};

//is active
isActive = (req, res, next) => {
  let token = req.headers["x-access-token"];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
    if (err) {
      console.log(err.message);
      next();
    } else {
      let user = await User.findById(decode.user_id);
      if(!user){
        res.json({
          message: "no user found"
        })
        return;
      }
      if(user){
        if(user.activeStatus == false){
          return res.json({
            message:"user in not active"
          })
        }
        next();
        return;
      }
    }
  });
}

//check user
checkUser = (req, res, next) => {
  let token = req.headers["x-access-token"];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
    if (err) {
      console.log(err.message);
      next()
    } else {
      let user = await User.findById(decode.id);
      if (!user) {
        res.json({
          message: "no user found"
        })
        return;
      }
      if (user) {
        res.json({
          message: "user found",
          user
        })
        return;
      }
    }
  });
}

//check if is admin
isAdmin = (req, res, next) => {
  let token = req.headers["x-access-token"];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
    if (err) {
      console.log(err.message);
      next()
    }else{
      let user = await User.findById(decode.id);
      if (!user) {
        res.json({
          message: "no user found"
        })
        return;
      }
      if(user) {
        if(user.role === 1){
          next();
          return;
        }

        res.status(403).json({
          message: "Require Admin Role!"
        });
        return;
      }
    }
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  checkUser,
  isActive
};

module.exports = authJwt;