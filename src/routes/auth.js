const express = require("express");
const authRouter = express.Router();
const {validateSignUpData, validateLoginData} = require("../utils/validators");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookieParser = require('cookie-parser');


authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
    const {firstName , lastName , emailId, password , userName , age , gender } = req.body;
  try {
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const newUser = new User({
        firstName,lastName,emailId,password:passwordHash,userName,age,gender
      });
    await newUser.save();
    res.send("User saved Successfully : " + newUser);
  } catch (err) {
    res.status(400).send("Something Went Wrong : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
    const {emailId, password} = req.body;
    try {
      validateLoginData(req);
      const user = await User.findOne({emailId:emailId});
      if (!user) {
          throw new Error("Invalid Credentials!");  
      }
      const isPassword = await user.validatePassword(password);
      if (isPassword) {
          const token = await user.getJWT();
          res.cookie('token', token);
          res.status(200).send("Login Successfull !");
      }else{
          throw new Error(" Invalid Credentials !");
      }
    } catch (error) {
      res.status(400).send("Something went wrong :" +error.message);
    }
    
  });


module.exports = authRouter;