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

const generateTokenForPayload = (email: any, google_id:any): string =>{
    return jwt.sign(
        {
            email,
            google_id
        },
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    );
}

const generateTokenForGoogle = (fullname: string, id_number: number, password: string, email: string, google_id: string) =>{
    return jwt.sign(
        {
            fullname,
            id_number,
            password,
            email,
            google_id 
        },
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    )
}

export {verifyToken, generateToken, generateTokenForPayload, generateTokenForGoogle};