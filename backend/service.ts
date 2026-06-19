import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRouter from "./router/admin/admin.controller.ts";
import connectDb from "./config/db.ts";

dotenv.config();


const app = express();

// middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://citynuts2-0.vercel.app",
        "https://citynuts2-0-git-main-jeevanvishnus-projects.vercel.app"
    ],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
// admin router
app.use('/admin',adminRouter)

const PORT = process.env.PORT || 4000;

// Server function to connect database and start server
const server = async () =>{
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Server starting failed...")
    }
}

server()
