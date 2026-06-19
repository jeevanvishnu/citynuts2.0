import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "../../models/admin/admin.model.ts";
import "dotenv/config";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URL);

    const password = await bcrypt.hash("Admin@123", 10);

    const admin = new Admin({
        email: "admin@gmail.com",
        password: password,
        role:"admin"
    });

    await admin.save();
    console.log("Admin created successfully!");
    
    await mongoose.disconnect();
};

run();
