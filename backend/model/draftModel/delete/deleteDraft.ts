import pool from "../../../configs/db/pool";

const deleteDraftById = async(draft_id: any) =>{
    try{
        await pool.query('DELETE FROM draft where draft_id = $1', [draft_id]);
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {deleteDraftById};