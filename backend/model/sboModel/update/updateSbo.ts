import pool from "../../../configs/db/pool";

const updateSboStatus = async(sbo_id: any) =>{
    try{
        await pool.query(`UPDATE sbo SET is_verified = true WHERE sbo_id = $1`, [sbo_id]);
        console.log("Sbo Updated!");
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {updateSboStatus}