import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {dbname: 'blogApp'});
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;