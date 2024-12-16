import pool from "../../configs/db/pool";
import { generateAdminToken } from "../../helper/auth/jwt";

const getAdmin = async(admin_name:any, admin_password:any) =>{
    try{
        const admin = await pool.query("SELECT * from admin where admin_name = $1 AND admin_password = $2", [admin_name, admin_password]);
        const data = {
            token: generateAdminToken(admin.rows[0].admin_id),
        }
        return data;
    }catch(e){
        throw e;
    }
}
const getAdminById = async(admin_id:any) =>{
    try{
        const admin = await pool.query("SELECT * from admin where admin_id = $1", [admin_id]);
        return admin.rows[0];
    }catch(e){
        throw e;
    }
}
const createAdmin = async(admin_name:any, admin_password:any) =>{
    try{
        await pool.query('INSERT INTO admin(admin_name, admin_password) VALUES ($1,$2)', [admin_name, admin_password]);
    }catch(e){
        throw e;
    }
}
export {getAdmin, createAdmin, getAdminById}