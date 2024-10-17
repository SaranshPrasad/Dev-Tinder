const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName"]);

    res.status(200).json({ message: "All requests are here !", requests });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requestAccepted = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
    .populate("fromUserId", ["firstName"])
    .populate("toUserId", ["firstName"]);
    const data = requestAccepted.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.status(200).json({ message: "Data Fetched !", data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

module.exports = userRouter;
