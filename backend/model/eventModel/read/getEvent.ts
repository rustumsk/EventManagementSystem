import pool from "../../../configs/db/pool";
const getFeaturedEvent = async () => {
    try{
        const data = await pool.query('SELECT * FROM event LIMIT 8');
        return data.rows;
    }catch(e){
        console.log(e);
        return (e);
    }
}
const getMyEventWithId = async (sbo_id: any) =>{
    try{
        const data = await pool.query('SELECT * FROM event where sbo_id = $1', [sbo_id]);
        return data.rows;
    }catch(e){
        console.log(e);
        return (e);
    }
}
const getEventByStudentId = async (student_id: any) =>{
    try{
        const data = await pool.query(`
            SELECT 
                e.event_id,
                e.event_name,
                e.event_date,
                e.start_time,
                e.end_time,
                e.location_id,
                e.category_id,
                e.event_description,
                e.event_image,
                e.event_type,
                e.is_done
            FROM 
                Participant p
            JOIN 
                Event e ON p.event_id = e.event_id
            JOIN 
                Student s ON p.student_id = s.student_id
            WHERE 
                s.student_id = $1
        `, [student_id]);
        return data.rows;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}
const getEventByIdNameDate = async(sbo_id: any, event_name:any, event_date: any) =>{
    try{
        const result = await pool.query('SELECT * from event where sbo_id = $1 AND event_name = $2 AND event_date = $3', [sbo_id, event_name, event_date]);
        return result.rows;
    }catch(e){
        console.log(e);
        throw(e);
    }
}
const getTopEvent = async() =>{
    try{
        const result = await pool.query('SELECT * from event ORDER BY RANDOM() LIMIT 8');
        return result.rows;
    }catch(e){
        throw e
    }
}
const getEvent = {
    getFeaturedEvent,
    getMyEventWithId,
    getEventByIdNameDate,
    getEventByStudentId,
    getTopEvent
};

export default getEvent