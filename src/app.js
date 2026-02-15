const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/userSchema");

app.use(express.json());

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

// app.get('/byid',async(req,res)=>{
//   // console.log(req.body._id)
//   const userId = req.body.userId
//   const user = await User.findById(userId)
//   // console.log(user)
//   res.send(user)
// })

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId);
  res.send("User deleted");
});

app.patch("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail)
  const data = req.body;
  console.log(data)
  try{
   await User.findOneAndUpdate({emailId:userEmail}, data);
  //  if(userEmail!==User.emailId){
  //   res.status(404).send('User not validate')
  //  }
  res.send("user update successfully");
  }
  catch(err){
    res.status(404).send('something went wrong');;
  }
});

app.post("/signup", async (req, res) => {
  // console.log(req.body)
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Useradded done");
  } catch (error) {
    res.status(400).send("Error in database");
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
