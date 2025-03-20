import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export interface customReq extends Request{
    token?: {userId: number}
}

interface DecodedToken extends JwtPayload{
    userId:number
  }

export const authMiddleWare = async (req:customReq, res:Response, next:NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token){
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken
        req.token = {userId:decoded.userId}
        next();
    } catch (error) {
        res.status(401).send('Please authenticate');
    }
}