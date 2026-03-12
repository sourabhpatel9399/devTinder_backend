const express = require('express');
const authRouter = express.Router();
const User = require('../models/userSchema');
const { validationForSignup } = require("../utils/validatore");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  validationForSignup(req);
  const { firstName, lastName, emailId, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  // console.log(hashPassword)
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashPassword,
  });

  try {
    await user.save();
    res.send("Useradded done");
  } catch (error) {
    res.status(400).send("Error in database");
    console.log(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // console.log(emailId)
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credantial ");
    }
    const validpassword = await user.validatePassword(password);
    if (validpassword) {
      
      const token = await user.getJWT();
      res.cookie("token", token);

      res.send("Login successfull");
    } else {
      throw new Error("invalid credantial");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports=authRouter