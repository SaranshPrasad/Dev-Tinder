const express = require("express"); // Express Module
const app = express(); // Initializing app
const { connectDB } = require("./config/database");// Database Connection Function
const cookieParser = require('cookie-parser');

const PORT = 3000; // PORT

// Using middlewares 
app.use(cookieParser());
app.use(express.json()); // Middleware for body datas

// Routers 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
// Database Connection
connectDB()
  .then(() => {
    console.log("Database connection done !");
    console.log(`Server is up 🚀 at url :- http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error("Database connection issue : ", err.message);
  });

// Use Router for all the / 
app.use("/", authRouter);
app.use("/", profileRouter); 
app.use("/", requestRouter); 
app.use("/", userRouter);

// Error handling for better user experience and security


// Server is Up !
app.listen(PORT, (req, res) => {
  console.log(`Server is starting at ${PORT}!`);
});
