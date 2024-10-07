const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://saranshprasad08:saransh001@devtinder.jf9tf.mongodb.net/?retryWrites=true&w=majority&appName=DevTinder/DevTinder");
}

module.exports = {
    connectDB
}

