import pool from "../../../configs/db/pool";

const updateStudentStatus = async(student_id: any) =>{
    try{
        await pool.query(`UPDATE student SET is_verified = true WHERE student_id = $1`, [student_id]);
        console.log("Student Updated!");
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {updateStudentStatus}