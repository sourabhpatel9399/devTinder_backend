const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/userSchema");
const { validationForSignup } = require("./utils/validatore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {userAuth} = require('./middleware/auth')
app.use(express.json());
app.use(cookieParser());

// fetting the data from the database;

app.get("/fetch", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("Not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId);
  res.send("User deleted");
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;

  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["firstName", "lastName", "password", "userId"];
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    console.log(isAllowed);
    if (!isAllowed) {
      res.status(404).send("Updation not allowed");
    }

    await User.findByIdAndUpdate(userId, data);
    res.send("user update successfully");
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // console.log(emailId)
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credantial ");
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (validpassword) {
      const token = await jwt.sign({ _id: user._id }, "Sourabh@123");
      res.cookie("token", token);
      // console.log(token);
      res.send("Login successfull");
    } else {
      throw new Error("invalid credantial");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user)
});
app.post("/sendRequest",userAuth,(req,res)=>{
  const user = req.user
  res.send('Request sent by : ' + user.firstName)
})

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
