const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const userAuth = async(req,res,next)=>{
  try {
    const {token} = req.cookies;
  if(!token){
    throw new Error('Invalid token')
  }
  const decode = jwt.verify(token,'Sourabh@123');
  const {_id} = decode;
  const user = await User.findOne({_id});
  
  req.user = user;

  // console.log('profile')
  next();
    
  } catch (error) {
    res.send('ERROR: ' + error);
  }
  // next();
}

module.exports = {
  userAuth,
}