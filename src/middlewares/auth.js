const jwt = require("jsonwebtoken");
const User = require("../models/user"); // User Model

const userAuth = async (req, res, next) => {
    // Read the token from cookies 
    const {token} = req.cookies;
    try {
        if(!token){
            throw new Error("Something went wrong login again");
        }
        const decodedMessage = await jwt.verify(token, "DEV@TINDER009");
    const {_id} = decodedMessage;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("Something went wrong login again !");
    }
    req.user = user;
    next();
    } catch (error) {
        res.status(400).send(error.message);
    }
    
    
}
module.exports = {
    userAuth
}