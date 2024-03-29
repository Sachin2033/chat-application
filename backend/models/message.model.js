import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message:{
      type : String,
      required : true  
    }

},{timestamps:true}); // ==> createdAt and updatedAt fields ( IN FRONTEND -> message.createdAt -> 12:30 )

const Message = mongoose.model("Message",messageSchema);
export default Message ;