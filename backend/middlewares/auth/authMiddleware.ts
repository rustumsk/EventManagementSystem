import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helper/auth/jwt";
import jwt from 'jsonwebtoken';

const authorizeUser = (req: Request, res: Response, done: NextFunction) =>{
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) res.status(401).json({message:"Unauthorize"});

    const token = bearerToken?.split(' ')[1];

    jwt.verify(token, process.env.SECRETKEY, (err: any,user: any) =>{
        if (err){
            return res.status(403).json({message:'Forbidden!'});
            req.user = user;
            done();
        }
    });
}

const authMiddleware = {
    authorizeUser
}

export default authMiddleware;