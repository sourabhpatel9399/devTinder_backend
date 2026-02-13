const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sourabhpatel:sourabh1234@sourabh.txuk6ov.mongodb.net/devtinder",
  );
};

module.exports = connectDB;
