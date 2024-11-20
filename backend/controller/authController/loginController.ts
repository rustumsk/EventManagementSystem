import { RequestHandler } from "express";
import findStudent from "../../model/studentModel/view/findStudent";
import passwordHelper from "../../helper/auth/hashPassword";
import { generateToken } from "../../helper/auth/jwt";

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

        const token = generateToken(user.rows[0])
        res.status(200).json({ message: "Login Successfuly", token: token});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginController = {
    localLogin
};

export default loginController;