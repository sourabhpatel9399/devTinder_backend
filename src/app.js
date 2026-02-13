const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/userSchema");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "ankit",
    lastName: "patel",
    emailId: "ankit@gmail.com",
    password: "ankit@123",
    age: 25
  });

  try {
    await user.save();
  res.send("Useradded done");
  } catch (error) {
    res.status(400).send('Error in database')
  }
  
});
try {
  connectDB();
  console.log("Database connection done");
} catch (error) {
  console.log(error);
}

app.listen(3000, (req, res) => {
  console.log("Server is running......");
});

// app.get('/user/:userId',(req,res)=>{
//   console.log(req.params)
//   res.send({firstname:"sourabh",lastname:"patel"});
// })
