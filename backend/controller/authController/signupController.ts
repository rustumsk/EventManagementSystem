import { Request, Response, RequestHandler } from "express";
import findStudent from "../../model/studentModel/view/findStudent";
import passwordHelper from "../../helper/auth/hashPassword";
import createStudent from "../../model/studentModel/crud/createStudent";
import { generateToken } from "../../helper/auth/jwt";
import { QueryResult } from "pg";

const createLocalStudentController: RequestHandler = async (req: Request, res: Response) => {
    const { id_num, email, fullname, password } = req.body;
    const hashedPassword = await passwordHelper.hashPassword(password);

    try {
        const user: QueryResult<any> = await findStudent.getStudentByEmail(email);

        if (user.rows.length > 0) {
            res.status(400).json({ message: "Email already in use!" });
            return;
        }

        await createStudent.createStudentByLocal(id_num,email,fullname,hashedPassword);
        const token =  generateToken(email);
        console.log("Student Created!");
        res.status(200).json({message: "Student Created!", token});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const createGoogleStudentController: RequestHandler = async (req: Request, res: Response) => {
    const { id_num, email, fullname, password, google_id } = req.body;
    const hashedPassword = await passwordHelper.hashPassword(password);

    try {
        const user: QueryResult<any> = await findStudent.getStudentByEmail(email);

        if (user.rows.length > 0) {
            res.status(400).json({ message: "Email already in use!" });
            return;
        }

        await createStudent.createStudentByGoogle(id_num,email,fullname, hashedPassword, google_id);
        const token =  generateToken(email);
        console.log("Student Created!");
        res.status(200).json({message: "Student Created!", token});

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


export { createLocalStudentController, createGoogleStudentController };
