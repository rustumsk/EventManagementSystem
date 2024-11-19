import { RequestHandler } from "express";
import { generateTokenForGoogle } from "../../helper/auth/jwt";

const generateTokenController: RequestHandler = (req,res)  =>{
    const {fullname,id_number,password,email,google_id} = req.body;

    const token = generateTokenForGoogle(fullname,id_number,password,email,google_id);

    res.status(200).json({token});
}

export {generateTokenController};