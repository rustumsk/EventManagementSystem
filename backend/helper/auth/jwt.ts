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

const generateIdToken = (student_id: string): string =>{
    return jwt.sign(
        {student_id},
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    );
};

const generateUserToken = (userObj: object) => {
    return jwt.sign({
        userObj
    },
        process.env.SECRET_KEY,
    )
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

const generateTokenForGoogle = (id_number: number, email: number, fullname: string, password: string, google_id: string) =>{
    return jwt.sign(
        {
            id_number,
            email,
            fullname,
            password,
            google_id 
        },
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    )
}

export {verifyToken, generateToken, generateTokenForPayload, generateTokenForGoogle, generateUserToken, generateIdToken};