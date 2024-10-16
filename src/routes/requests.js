
const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
requestRouter.post("/request/send/:status/:toUserId", userAuth , async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            throw new Error(`Invalid Status type :-  ${status} `);
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId},
        ],
        });
        if (existingConnectionRequest) {
            throw new Error("Request already exists !");
        }

        const connectionRequest  = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save();
        res.json({
            message:`${req.user.firstName} Connection Request Send Successfully !`, 
            data,
        })
    } catch (error) {
        res.status(400).send("Something went wrong !"+error.message);
    }
})
module.exports = requestRouter;