import pool from "../../configs/db/pool";

const getFeedbackByEventId = async(event_id:any) =>{
    try{
        const result = await pool.query(`SELECT s.fullname, f.rating, f.feedback from student s join feedback f on s.student_id = 
            f.student_id join event e on f.event_id = e.event_id WHERE e.event_id = $1`, [event_id]);
        return result.rows;
    }catch(e){
        console.log(e);
        throw e;
    }
}
const getAverageFeedbackBySboId = async (sbo_id: any) => {
    try {
        const result = await pool.query(
            "SELECT e.event_id, e.event_name, e.event_date, AVG(f.rating) AS average_rating " +
            "FROM feedback f " +
            "JOIN event e ON f.event_id = e.event_id " +
            "JOIN sbo s ON e.sbo_id = s.sbo_id " +
            "WHERE s.sbo_id = $1 " +
            "GROUP BY e.event_id, e.event_name, e.event_date", [sbo_id]
        );
        return result.rows;
    } catch (e) {
        throw e;
    }
}

const getAverageFeedbackByEvent = async(event_id: any) =>{
    try{
        const result = await pool.query('SELECT AVG(RATING) FROM feedback where event_id = $1', [event_id]);
        return result.rows;
    }catch(e){
        throw e;
    }
}
export {getFeedbackByEventId, getAverageFeedbackBySboId,getAverageFeedbackByEvent}