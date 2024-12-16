import pool from "../../../configs/db/pool";

const deleteParticipantById = async(particpant_id:any) =>{
    try{
        await pool.query('DELETE FROM participant where participant_id = $1', [particpant_id]);
        console.log("Participant Deleted!");
    }catch(e){
        console.log(e);
        throw e;
    }
}

export{deleteParticipantById};