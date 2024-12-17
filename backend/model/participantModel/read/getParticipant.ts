import pool from "../../../configs/db/pool";

const getParticipantIdByEI = async(event_id: any, student_id:any) =>{
    try{
        const result = await pool.query("SELECT participant_id from participant where event_id = $1 AND student_id = $2", [event_id, student_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}

const getParticipantStatus = async(event_id: any, student_id:any) =>{
    try{
        const result = await pool.query("SELECT checked_in from participant where event_id = $1 AND student_id = $2", [event_id, student_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}
const getAllParticipantByEventId = async (sbo_id: any) => {
    try {
        const result = await pool.query(
            "SELECT * FROM participant p " +
            "JOIN event e ON p.event_id = e.event_id " +
            "JOIN sbo s ON s.sbo_id = e.sbo_id " +
            "WHERE e.sbo_id = $1", [sbo_id]
        );
        return result.rows;
    } catch (e) {
        throw e;
    }
}

const getParticipantAverage = async (sbo_id: any) => {
    try {
        const result = await pool.query(
            "SELECT * FROM participant p " +
            "JOIN event e ON p.event_id = e.event_id " +
            "JOIN sbo s ON s.sbo_id = e.sbo_id " +
            "WHERE e.sbo_id = $1 AND p.checked_in = true", [sbo_id]
        );
        return result.rows;
    } catch (e) {
        throw e;
    }
};

const getParticipantAverage1 = async (sbo_id: any) => {
    try {
        const result = await pool.query(
            "SELECT * FROM participant p " +
            "JOIN event e ON p.event_id = e.event_id " +
            "JOIN sbo s ON s.sbo_id = e.sbo_id " +
            "WHERE e.sbo_id = $1 AND p.checked_in = false", [sbo_id]
        );
        return result.rows;
    } catch (e) {
        throw e;
    }
};

const getCheckedParticipantByEventId = async(event_id:any) =>{
    try{
        const result = await pool.query("SELECT * FROM participant WHERE event_id = $1 AND checked_in = true", [event_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}
const getUncheckedParticipantByEventId = async(event_id:any) =>{
    try{
        const result = await pool.query("SELECT * FROM participant WHERE event_id = $1 AND checked_in = false", [event_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}
const getAllParticipantByEventId1 = async(event_id:any) =>{
    try{
        const result = await pool.query("SELECT * FROM participant WHERE event_id = $1", [event_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}
export {getParticipantIdByEI,getParticipantStatus, getAllParticipantByEventId, getParticipantAverage, getParticipantAverage1, getCheckedParticipantByEventId, getUncheckedParticipantByEventId, getAllParticipantByEventId1};
