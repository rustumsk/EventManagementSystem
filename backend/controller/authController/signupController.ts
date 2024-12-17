import { Request, Response, RequestHandler } from "express";
import findStudent from "../../model/studentModel/read/findStudent";
import passwordHelper from "../../helper/auth/hashPassword";
import createStudent from "../../model/studentModel/create/createStudent";
import { generateToken } from "../../helper/auth/jwt";
import { QueryResult } from "pg";
import { createLocalSbo } from "../../model/sboModel/create/createSbo";
import { createAdmin } from "../../model/helper/adminModel";

const createLocalStudentController: RequestHandler = async (req: Request, res: Response) => {
    const { id_num, email, fullname, password, sbo_name } = req.body;
    const hashedPassword = await passwordHelper.hashPassword(password);

    try {
        const user: QueryResult<any> = await findStudent.getStudentByEmail(email);

        if (user.rows.length > 0) {
            res.status(400).json({ message: "Email already in use!" });
            return;
        }

        await createStudent.createStudentByLocal(id_num,email,fullname,hashedPassword, sbo_name);
        console.log("Student Created!");
        res.status(200).json({message: "Student Created!"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const createGoogleStudentController: RequestHandler = async (req: Request, res: Response) => {
    const { id_num, email, fullname, password, google_id, sbo_name } = req.body;
    const hashedPassword = await passwordHelper.hashPassword(password);
    
    try {
        const user: QueryResult<any> = await findStudent.getStudentByEmail(email);

        if (user.rows.length > 0) {
            res.status(400).json({ message: "Email already in use!" });
            return; 
        }

        await createStudent.createStudentByGoogle(id_num,email,fullname, hashedPassword, google_id, sbo_name);
        const token =  generateToken(email);
        console.log("Student Created!");
        res.status(200).json({message: "Student Created!", token});

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const createLSbo = async(req:Request, res:Response) =>{
    const {sbo_email, sbo_name, sbo_password, contact_num} = req.body;
    const hashedPassword = await passwordHelper.hashPassword(sbo_password);
    
    try{
        await createLocalSbo(sbo_email, sbo_name, hashedPassword, contact_num);
        res.status(200).json({message:"SBO CREATED!"});
    }
    catch(e){
        res.status(400).json({error: e});
    }
} 

const createAd = async(req:Request, res:Response) =>{
    const {admin_name, admin_password} = req.body;

    try{
        await createAdmin(admin_name, admin_password);
        res.status(200).json("Admin Created!");
    }catch(e){
        res.status(500).json("Internal Server Error");
    };
}
export { createLocalStudentController, createGoogleStudentController, createLSbo, createAd };
