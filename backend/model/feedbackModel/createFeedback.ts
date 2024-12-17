import pool from "../../configs/db/pool";

const createFeedback = async(event_id:any, student_id:any, rating:any, feedback:any) =>{
    try{
        await pool.query("INSERT INTO feedback(event_id, student_id, rating, feedback) VALUES($1,$2,$3,$4)", [event_id,student_id,rating,feedback]);
        console.log("Feedback Sent!");
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {createFeedback}