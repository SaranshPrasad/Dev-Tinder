const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully : " + user);
  } catch (error) {
    console.error("Something went wrong :", error.message);
    res.status(400).send("Something went wrong :" + error.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const userId = req.user._id;
  const userData = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];
    const isAllowedUpdates = Object.keys(userData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdates) {
      throw new Error("Update not allowed !");
    }
    const user = await User.findByIdAndUpdate(userId, userData, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully : " + user);
  } catch (err) {
    res.status(400).send("Update Failed : " + err.message);
  }
});
module.exports = profileRouter;
