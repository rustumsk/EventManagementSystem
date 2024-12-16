import pool from "../../../configs/db/pool";

const deleteStudentById = async(student_id:any) =>{
    try{
        await pool.query(`DELETE FROM student where student_id = $1`, [student_id]);
        console.log("Student Deleted!");
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

export {deleteStudentById};