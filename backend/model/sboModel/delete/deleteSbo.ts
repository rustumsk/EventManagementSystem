import pool from "../../../configs/db/pool";

const deleteSboById = async(sbo_id:any) =>{
    try{
        await pool.query("DELETE FROM sbo where sbo_id = $1", [sbo_id]);
        console.log("SBO DELETED!");
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {deleteSboById}