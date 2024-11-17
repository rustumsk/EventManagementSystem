import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helper/auth/jwt";

const authenticate = (req: Request, res: Response, done: NextFunction) =>{
    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(403).json("Forbidden");
        res.redirect('/login')
    }

    const decode = verifyToken(token);
}