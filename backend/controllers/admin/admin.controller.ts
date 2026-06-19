import Admin from "../../models/admin/admin.model.ts";
import type {Request , Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Secrect_key";

// loginAdmin
export const adminLogin = async (req:Request , res:Response) => {
    try{
        const {email, password} = req.body;
        console.log(email, password);
        const admin = await Admin.findOne({email});
        

        if(!admin){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password , admin.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        
        const token = jwt.sign({ id: admin._id, email: admin.email , role:admin.role}, JWT_SECRET, { expiresIn: '1d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({message:" logged in successfully", token});
    }catch(error: any){
        console.log("Error is from adminLogin", error)
        res.status(500).json({message:error?.message});
    }
}

export const adminLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error?.message });
    }
}

// check auth 
export const checkAuth = async (req: Request, res: Response) => {
    try {
        // The auth middleware sets req.user after verifying the token
        const user = (req as any).user;
        
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Return the admin details so the frontend can restore the session
        res.status(200).json({ 
            success: true, 
            admin: { 
                id: user.id, 
                email: user.email 
            } 
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error?.message });
    }
}