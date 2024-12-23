import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helper/auth/jwt";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const authorizeUser = (req: Request, res: Response, done: NextFunction) =>{
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) res.status(401).json({message:"Unauthorize"});

    const token = bearerToken?.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) =>{
        if (err){
            console.log(err);
            return res.status(403).json({message:'Forbidden!'});
        }
        console.log("verified");
        req.user = user;
        done();
    });
}

const authMiddleware = {
    authorizeUser
}

export default authMiddleware;