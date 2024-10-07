const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName , lastName , emailId , password } = req.body;
    if (!(firstName || lastName || emailId || password || userName)) {
        throw new Error("Please provide all user data !");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please provide a valid email address !");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password !");
    }
}

const validateLoginData = (req) => {
    const {emailId, password} = req.body;
    if(!emailId || !password){
        throw new Error("Please provide Email and Password !");
    }
}

const validateUpdateData = (req) => {
    const allowedFieldsUpdate = ["about", "photoUrl", "age", "skills", "firstName", "lastName"];
    const isAllowedUpdates = Object.keys(req.body).every((k) =>
        allowedFieldsUpdate.includes(k)
      );
      if (!isAllowedUpdates) {
        throw new Error("Update not allowed !");
      }
}
module.exports = {
    validateSignUpData, validateLoginData, validateUpdateData
}