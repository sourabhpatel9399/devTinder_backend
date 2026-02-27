const validator = require("validator");

const validationForSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
 
    if (!firstName || !lastName) {
    throw new Error("first name or last name not be empty");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email type is inncorect");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be 8 character includes number special character",
    )
  }
  
};
module.exports = {validationForSignup};
