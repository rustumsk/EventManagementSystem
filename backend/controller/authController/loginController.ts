import { RequestHandler, Request, Response } from "express";
import findStudent from "../../model/studentModel/read/findStudent";
import passwordHelper from "../../helper/auth/hashPassword";
import { generateUserToken } from "../../helper/auth/jwt";
import findSbo from "../../model/sboModel/read/findSbo";

const localLogin: RequestHandler = async (req, res): Promise<void> => {
    const { email, id_num, password } = req.body;

    if (!email && !id_num) {
        res.status(400).json({ message: "Email or ID number is required!" });
        return;
    }

    try {
        const user = await findStudent.getStudentPassword(email, id_num);

        if (user.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const match:boolean = await passwordHelper.verifyPassword(user.rows[0].password, password);

        if (!match){
            res.status(404).json({message:"Incorrect Password!"});
            return;
        }

        const token = generateUserToken(user.rows[0].student_id);
        console.log(token);
        
        res.status(200).json({ message: "Login Successfuly", token});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const localLoginSBO = async(req:Request , res:Response) =>{
    const {email,sbo_password} = req.body;

    if(!email){
        res.status(400).json({message:"Email required!"});
    }
    try{
        const sbo = await findSbo.findSboByEmail(email);
        
        if (sbo?.rows.length === 0){
            res.status(404).json({message:"SBO not found!"});
            return;
        }
        const match = await passwordHelper.verifyPassword(sbo?.rows[0].sbo_password, sbo_password);
        if(!match){
            res.status(404).json({message:"invalid password!"});
            return;
        }

        const token = generateUserToken(sbo?.rows[0].sbo_id);
        console.log(token);

        res.status(200).json({message:"Login Successful!", token: token});
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error!"});
    }
}

const loginController = {
    localLogin,
    localLoginSBO
};

export default loginController;