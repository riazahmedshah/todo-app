import express from "express";
import { signInTypes, signUpTypes } from "../types/authTypes";
import { handleError } from "../utils/handleError";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const authRouter = express.Router();

authRouter.post("/signup" ,async(req, res) => {
    const {success,error} = signUpTypes.safeParse(req.body);
    if(!success){
        res.status(411).json({ERROR:error});
    }
    try {
        const user = await prisma.user.findFirst({
            where:{
                email:req.body.email
            }
        });
        if(user){
            res.status(403).json({MSG:"User alreday Exixt!"});
            return;
        } else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await prisma.user.create({
                data:{
                    username:req.body.username,
                    email: req.body.email,
                    password:hashedPassword,
                 }
            });
            res.status(200).json({MSG:"User created successfully!"});
        }
    } catch (error) {
        handleError(error, res)
    }

});


authRouter.post("/signin", async(req, res) :Promise<void> => {
    const {success, error} = signInTypes.safeParse(req.body);
    if(!success){
        res.status(411).json({ERROR:error});
        return;
    }
    try {
        const user = await prisma.user.findFirst({
            where:{
                email:req.body.email
            }
        });

        if(user){
            const isMatch = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(isMatch){
                const token = jwt.sign({userId: user.id},process.env.JWT_SECRET as string,{expiresIn:"1hr"});
                res.status(200).json({token});
            } else{
                res.status(401).json({MSG:"Invalid email/password"});
            }
        } else{
            res.status(404).json({message:"User not found"})
        }
    } catch (error) {
        handleError(error, res)
    }
})
