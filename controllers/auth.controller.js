const db = require("../models");
const User = db.user;

require("dotenv").config();
const path = require("path")
const sendMail = require("../middlewares/send.mail")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const createToken =  (id) => {
  return jwt.sign({ user_id: id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME});
}

const createRefreshToken =  (id) => {
  return jwt.sign({ user_id: id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME});
}

//refresh token
const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decode) {
    if (err) {
      res.status(400).json({
        err
      })
    } else {
      let token = jwt.sign({ name: decode.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
      res.status(200).json({
        message: "token refreshed successfully",
        token,
        refreshToken
      })
    }
  })
}

//signup
const signupUser = (req, res) => {
  console.log("hit")
  try{
    const user = new User({
      displayName: req.body.displayName.trim(),
      userName: req.body.userName.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      accountType: "user",
      password: bcrypt.hashSync(req.body.password.trim(), 8)
    });

    // REMEMBER TO COMMIT THIS OUT
    if (req.body.role === "admin"){
      user.role = 1;
    }
    user.role = 0;
    var name = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password
    // var token = jwt.sign({name, email, password}, process.env.EMAIL_TOKEN_SECRET, { expiresIn: "20m" })

    // var mailOpt = {
    //   from: "no name",
    //   to: user.email,
    //   subject: 'email verification',
    //   html: `
    //     <h2>Please click on the given link to activate your account<p>]
    //     <p>${process.env.CLIENT_URL}/activate/${token}</p>
    //   `
    // };

    // sendMail(mailOpt);
    user.save((err, user) => {
      if (err) {
        res.status(500).json({
           message: err
          })
        console.log("Line 60: not successfull")
        return;
      }
      console.log("Success")
      res.json({ message: "User was registered successfully!" });
    });
  }catch(err){
    res.json({
      error: err.message
    });
  }
};

//signin
const signinUser = async (req, res) => {
  var name = req.body.username
  var password = req.body.password
  
    //check email confirmation status 
    //...............................
  try{
    const user = await User.findOne({$or: [{email:name},{phone:name}]});
    if (!user) {
      return res.status(404).json({
        nouser: "User Not found."
      });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if(!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        invpass: "Invalid Password!"
      });
    }
    // REMEMBER TO CORRECT THIS TO A CHECK
    user.activeStatus = true;

    const token = createToken(user._id);
    let refreshToken = createRefreshToken(user._id);
   
    // THIS RETURNS THE TOKEN

    user.save()
    .then((user) => {
      res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        // RIGHT HERE
        accessToken: token,
        refreshToken: refreshToken,
        activeStatus: user.activeStatus
      });    
    })
    .catch((err) => {
      console.log("From 122")
      res.json({
        error: err.message
      })
    })
  }catch(err){
    res.json({
      error: err.message
    })
  }
};

//signout
const signoutUser = (req, res, next) => {
  
  let token = req.headers["x-access-token"];

  if(!token){
    return res.status(403).json({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
    if (err) {
      console.log(err.message);
      next()
    } else {
      jwt.sign(token, "", {expiresIn: 1}, (logout, err) => {
        if(logout){
          res.json({
            message: "User logged out successfully"
          })
        } else{
          res.json({
            error: err.message
          })
        }
      })
    }
  });
}

const activateAccount = (req, res, next) => {
  const {token} = req.body;
  if(token){
    jwt.verify(token, process.env.EMAIL_TOKEN_SECRET, function(err, decode){
      if(err){
        res.status(400).json({
          error: "Incorrect or expired link"
        });
      }
      const {name, email, password} = decode;
      User.findOne({email})
      .exec((err, user) => {
        if (user) {
          res.status(400).send({ message: "user with this email already exist" });
          return;
        }

      });
    })
  }else{
    return res.json({
      error: "Something went wrong"
    })
  }
}

module.exports = {
    signupUser,
    signinUser,
    signoutUser,
    activateAccount,
    refreshToken
}