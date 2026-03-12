const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const sendingRequestRouter = require('./routes/request')

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',sendingRequestRouter);


try {
  connectDB();
  console.log("Database connection done");
} catch (error) {
  console.log(error);
}

app.listen(3000, (req, res) => {
  console.log("Server is running......");
});


