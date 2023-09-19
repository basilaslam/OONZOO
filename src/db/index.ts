import mongoose from 'mongoose'

let dbInstance : unknown;

const connectDB = async () => {
    try{
        const DB_NAME = process.env.DB_NAME
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        dbInstance = connectionInstance;
        console.log(`\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`)
            

    }catch(error){
        console.log("MongoDB connection error: ", error)
        process.exit(1)
    }
};

export default connectDB