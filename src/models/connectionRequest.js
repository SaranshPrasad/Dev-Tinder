const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    status:{
        type:String,
        enum:{
            values: ["ignore", "interested", "accepeted", "rejected"],
            message: `{VALUE} is incorrect status type !`
        }
    } 
},
{  timestamps: true}
);

connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(this.toUserId)){
        throw new Error("Connection already exists !");
    }
    next();
})



const ConnectionRequest  = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequest;