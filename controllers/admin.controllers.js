const User = require('../models/user');
//get all users
const getAllUsers = async (req, res) => {
  try{
    const users = await User.find();
    if(users){
      res.status(200)
      .json({
        users
      })
    }
  }catch(err){
    res.status(400)
    .json({
      error: err.message
    })
  }
  
};

//get a single user
const getUser = (req, res, next) => {
  let userId = req.body.id;
  try{
    const user = User.findById(userId);
    if(!user){
      res.json({
        error: "user does not exist"
      });
      return;
    }
    res.json({
      user
    });
  } catch(err){
    res.json({
      error: err.message
    });
  }
}


//change user balance
const changeUserBalance = async (req, res, next) => {
  let newBalance = req.body.balance;
  let userId = req.body.id;

  try{
    const user = await User.findById(userID);

    if(!user){
      res.json({
        error: "user does not exist"
      });
      return;
    }

    user.balance.prevBalance = user.balance.currBalance;
    user.balance.currBalance = newBalance

    user.save()
      .then((user) => {
        res.json({
          message: 'Balance updated successfully',
          user
        });
      })
      .catch((err) => {
        res.json({
          error: err.message
        })
      })
  } catch(err){
    res.json({
      error: err.message
    });
  }
}

//deactivate user account
const deactivateAccount = async (req, res, next) => {
  let userId = req.body.userID;
  try{
    const user = await User.findByIdAndUpdate(userId,
      { $set: { activeStatus: true } });
    if(!user){
      res.json({
        error: "user does not exist"
      });
      return;
    }ce.prevBalance = user.balance.currBalance;
    user.balance.currBalance = newBalance

    res.json({
      message: "Account deactivated",
      user
    });
  } catch(err){
    res.json({
      error: err.message
    });
  }
}

const toggleAutoIncrement = async (req, res, next) => {
  const active = req.body.active;
  const interval = req.body.interval;
  const amount = req.body.amount;
  try{
    for await (const user of User.find()){
      user.incrementParam = {
        active,
        interval,
        amount
      }
      res.json({
        message:"update successful"
      })
      await user.save();  
    } 
  }catch(err){
    res.json({
      error: err.message
    })
  }
}

module.exports = {
  getAllUsers,
  getUser,
  changeUserBalance,
  deactivateAccount,
  toggleAutoIncrement
}

//! TODO
// Add toggleAutoIncrement - which takes three arguments:
//          active: Boolean, interval(in hours): Integer, amountRange[min, max]: Array,
// Add deactivate account - To change account active status
// 