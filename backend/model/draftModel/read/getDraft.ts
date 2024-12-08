import pool from "../../../configs/db/pool";

const getDraftById = async(sbo_id:any) =>{
    try{
        const data = await pool.query(`SELECT * from draft where sbo_id = $1`, [sbo_id]);
        return data.rows;
    }catch(e){
        console.log(e);
    }   
    
}

export {getDraftById}