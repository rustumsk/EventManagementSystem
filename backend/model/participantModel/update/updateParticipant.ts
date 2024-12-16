import pool from "../../../configs/db/pool";

const updateParticipantStatus = async(participant_id:any, attendance_status:any, checked_in:any) =>{
    try{
        await pool.query(`UPDATE participant SET attendance_status = $1,
                                                 checked_in = $2
                          WHERE participant_id = $3 `,[attendance_status, checked_in, participant_id]);
        console.log("Participant Updated!");
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {updateParticipantStatus};