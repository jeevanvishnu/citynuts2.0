import mongoose from "mongoose";
import "dotenv/config"
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const URL = process.env.MONGODB_URL as string

// mongo database connection
const connectDb = async () => {
    try {
        mongoose.connect(URL)
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error connecting to database",error)
    }
}

export default connectDb