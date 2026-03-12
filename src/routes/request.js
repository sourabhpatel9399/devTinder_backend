const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleware/auth');

requestRouter.post("/sendRequest",userAuth,(req,res)=>{
  const user = req.user
  res.send('Request sent by : ' + user.firstName)
})

module.exports = requestRouter;