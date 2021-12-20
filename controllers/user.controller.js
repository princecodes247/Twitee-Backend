const { response } = require('express');
const User = require('../models/user');
const Twit = require('../models/twit');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer")
const path = require("path")
const sendEmail = require("../middlewares/send.mail")




//user dashboard
const userDetails = async (req, res, next) => {
  try{
    let userID = req.params.userID;
    console.log(userID)
    const user = await User.findById(userID);

    // REMOVE PASSWORD FROM USER DETAILS
    if(user){
      res.json({
        user
      })
    } 
  } catch(error){
      res.json({
        messagea: error.message
      });
  }
}

//get all twits
const getAllTwits = async (req, res, next) => {
  try{
    let userID = req.params.userID;
    console.log(userID)
    const users = await User.find();
    if(user){
      res.json({
        user
      })
    } 
  } catch(error){
      res.json({
        messagea: error.message
      });
  }
}
const getTwit = async (req, res, next) => {
  try{
    let userID = req.params.userID;
    console.log(userID)
    const users = await User.find();
    if(user){
      res.json({
        user
      })
    } 
  } catch(error){
      res.json({
        messagea: error.message
      });
  }
}



//Post a Twit
const postTwit = async (req, res, next) => {
  let userID = req.user._id;

  try{
    const date = new Date();

    const user = await User.findById(userID);

    if(user){
    // Remove this Logic
      const newTwit = new Twit({
        userID,
        body: req.body.twit,
        userName: req.body.userName,
        displayName: user.balance.displayName
      })

      twit.save()
      .then((user) => {
        res.json({
          message: 'Twit posted successfully'
        });
      })
      .catch((err) => {
        res.json({
          error: err.message
        })
      })
    }
  }catch(err){
    res.json({
      error: err.message
    })
  }
}

const postComment = async (req, res, next) => {
  let userID = req.user._id;
  let twitID = req.body.twitid
  try{
    const date = new Date();

    const twit = await Twit.findById(userID);

    if(twit){

      const comment = {
        userID,
        body: req.body.comment,
        userName,
        displayName
      }
      twit.comments.push(comment)
      twit.save()
      .then((twit) => {
        res.json({
          message: 'Comment posted successfully'
        });
      })
      .catch((err) => {
        res.json({
          error: err.message
        })
      })
    }
  }catch(err){
    res.json({
      error: err.message
    })
  }
}

const likeTwit = async (req, res, next) => {
  let userID = req.user._id;
  let twitID = req.body.twitid
  try{
    const date = new Date();

    const twit = await Twit.findById(userID);

    if(twit){

        const like = {
        userID,
        userName,
        displayName
      }
      if (twit.likes.includes(like)) {
      twit.likes.push(like)
      twit.save()
      .then((twit) => {
        res.json({
          message: 'Twit liked successfully'
        });
      })
      .catch((err) => {
        res.json({
          error: err.message
        })
      })
      }
    }
  }catch(err){
    res.json({
      error: err.message
    })
  }
}


//user setting
const userSetting = (req, res, next) => {
  const userID = req.body.userID;

  let updatedData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    accounttype: req.body.accounttype,
    password: bcrypt.hashSync(req.body.password, 8)
  }

  try{
    const user = User.findByIdAndUpdate(userID, { $set: { updateData }});
    res.json({
      message: 'user updated successful'
    });
  }catch(err){
    res.json({
      error: err.message
    });
  }
}

const changePassword = (req, res, next) => {
  const userID = req.body.userID;

  let updatedData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    accounttype: req.body.accounttype,
    password: bcrypt.hashSync(req.body.password, 8)
  }

  try{
    const user = User.findByIdAndUpdate(userID, { $set: { updateData }});
    res.json({
      message: 'user updated successful'
    });
  }catch(err){
    res.json({
      error: err.message
    });
  }
}



const emailVerification = (req, res, next) => {
  const code = req.body.code;
  
}
const deleteTwit = (req, res, next) => {
  const code = req.body.code;
  
}

module.exports = {
  userDetails,
  postTwit,
  likeTwit,
  getAllTwits,
  getTwit,
  getTwit,
  deleteTwit,
  userSetting,
}

