import pool from "../../../configs/db/pool";

const createParticipant = async(event_id: number,student_id:number,attendance_status:string, custom_respnonses:any) =>{
    try{
        const result = await pool.query(`INSERT INTO participant(event_id, student_id, attendance_status, custom_responses) 
                         VALUES($1,$2,$3,$4) RETURNING participant_id`
            , [event_id, student_id,attendance_status, custom_respnonses]);
            console.log("Participant joined!");
            return result.rows[0].participant_id;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {createParticipant}