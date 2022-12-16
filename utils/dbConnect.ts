import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connect = async () => {
    try {
        if(!process.env.MONGO) return;
        await mongoose.connect(process.env.MONGO);

        console.log('MongoDB connected')
    }catch(e) {
        console.log('We have an error with the DB ->', e)
    }
    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB disconnected!");
    });
}

export { connect }