const express = require("express");
const app = express();

const { adminAuth , userAuth} = require("./middleware/auth");

app.use("/admin",adminAuth);
app.use("/user", userAuth)

app.get("/user/getAllData",(req,res)=>{
    res.send('Getting all the users')
});

app.get('/user/deleteUser',(req,res)=>{
  res.send('Delete the users from user')
});


app.get("/admin/getAllData",(req,res)=>{
    res.send('Getting all the users')
});

app.get('/admin/deleteUser',(req,res)=>{
  res.send('Delete the users')
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});



// app.get('/user/:userId',(req,res)=>{
  //   console.log(req.params)
  //   res.send({firstname:"sourabh",lastname:"patel"});
  // })