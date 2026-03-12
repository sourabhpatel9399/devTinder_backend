const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("write a valid email address");
        }
      },
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is weak");
        }
      },
    },
    age: {
      type: Number,
    },
    skills: {
      type: [String],
      default: ["HTML", "CSS", "JAVASCRIPT"],
    },
    photoUrl: {
      type: String,
      default: "https://www.geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Profile url");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id } ,"Sourabh@123",{expiresIn:"7d"});
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const validpassword = await bcrypt.compare(passwordInputByUser, passwordHash);
  return validpassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
