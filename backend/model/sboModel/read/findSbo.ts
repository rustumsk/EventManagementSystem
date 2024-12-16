import pool from "../../../configs/db/pool";

const findSboByEmail = async(email:string) =>{
    try{
        return await pool.query('SELECT sbo_id,sbo_password, is_verified from Sbo where sbo_email = $1', [email]); 
    }catch(e){
        console.log(e);
    }
}

const findSboById = async(sbo_id:string) =>{
    return await pool.query('SELECT * from Sbo where sbo_id = $1', [sbo_id]);    
}
const getAllSbo = async() =>{
    return await pool.query('SELECT sbo_name from sbo');
}
const getAllUnverified = async() =>{
    return await pool.query('SELECT * from sbo where is_verified = false');
}
const findIdByName = async(sbo_name:any) =>{
    try{
        console.log("Hi");
        const data = await pool.query('SELECT sbo_id from sbo where sbo_name = $1', [sbo_name]);
        return data.rows;
    }catch(e){
        console.log(e);
    }
}
const findSbo = {
    findSboByEmail,
    findSboById,
    getAllSbo,
    findIdByName,
    getAllUnverified
}

export default findSbo;