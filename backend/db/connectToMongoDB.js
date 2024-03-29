import mongoose from 'mongoose' ;
import dotenv from 'dotenv';

const connectToMongoDB = async () => {
    try{
        dotenv.config();
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongoDB") ;
    }catch(err){
        console.log("Error connecting to mongoDB" , err.message);

    }
}

export default connectToMongoDB ;