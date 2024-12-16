import { Request, Response } from "express";
import { getAdmin,getAdminById } from "../../model/helper/adminModel";

const adminController = async(req: Request, res:Response) =>{
    const {admin_name, admin_password} = req.body;
    try{
        const result = await getAdmin(admin_name, admin_password);
        if (result){
            res.status(200).json(result);
        }
    }catch(e){
        console.log(e);
        res.status(500).json("Internal Server Error!");
    }
}

const getAdminController = async (req:Request, res:Response) =>{
    const {admin_id} = req.params
        try{
            const result = await getAdminById(admin_id);
            if (result){
                res.status(200).json(result);
            }
        }catch(e){
            console.log(e);
            res.status(500).json("Internal SErver Error");
        }
}
export {adminController, getAdminController}