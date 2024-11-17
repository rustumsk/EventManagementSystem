import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (email: string): string =>{
    return jwt.sign(
        {email},
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    );
};

const verifyToken = (token: string): any =>{
    try{
        return jwt.verify(token,process.env.SECRET_KEY);
    }catch(e){
        return null;
    }
}

export {verifyToken, generateToken};