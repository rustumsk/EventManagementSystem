import pool from "../../../configs/db/pool";


const createLocalSbo = async(sbo_email:string,sbo_name:string, password:string, contact_num:string) =>{
    try{
        await pool.query('INSERT INTO SBO(sbo_email,sbo_password,sbo_name,contact_num) VALUES($1,$2,$3,$4)', [sbo_email, password,sbo_name,contact_num]);
        console.log("Sbo Created!");
    }
    catch(e){
        throw e;
    }
    
}

export {createLocalSbo};