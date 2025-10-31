import mongoose from "mongoose";

export const connectDB = async () => {
    console.log("MONGO_URI:", process.env.MONGO_URI); // Optional: check it
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("❌ MongoDB connection error", error);
    }
};
