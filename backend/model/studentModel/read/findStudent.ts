import pool from "../../../configs/db/pool";
import { QueryResult } from "pg";

const getStudentByEmail = async (email: string): Promise<QueryResult<any>> => {
    try {
        return await pool.query('SELECT * FROM student WHERE student_email = $1', [email]);
    } catch (e) {
        console.error('Database error:', e);
        throw e;
    }
};
const getStudentByStudentId = async(student_id: string) => {
    try{
        return await pool.query('SELECT * FROM student WHERE student_id = $1', [student_id]);
    }catch(e){
        console.error(e);
        throw e;
    }
}
const getStudentByGoogleId = async(googleId:string): Promise<QueryResult<any>> =>{
    try{
        return await pool.query('SELECT * FROM student WHERE google_id = $1', [googleId]);
    }catch(e){
        throw(e);
    }
}
const getStudentPassword = async (email?: string, id_num?: number): Promise<QueryResult<any>> => {
    try {
        if (email) {
            return await pool.query('SELECT * FROM student WHERE student_email = $1', [email]);
        } else if (id_num) {
            console.log(typeof id_num);
            const int_id_num = Number(id_num)
            console.log(typeof int_id_num);
            return await pool.query('SELECT * FROM student WHERE id_num = $1', [int_id_num]);
        } else {
            throw new Error("Email or ID number is required");
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};
const findAllStudentParticipant = async (event_id: any) => {
    try{
        const result = await pool.query(`SELECT p.participant_id, s.fullname, p.checked_in, p.registered_at, p.attendance_status FROM Student s INNER JOIN Participant p ON s.student_id = p.student_id WHERE event_id = $1`,[event_id]);
        return result.rows;
    }catch(e){
        console.log(e);
        throw e;
    }
}

const getStudentBySbo = async (sbo_name:any) =>{
    try{
        const result = await pool.query(`SELECT * From student where sbo_name = $1 AND is_verified = false`, [sbo_name]);
        return result.rows;
    }catch(e){
        console.log(e);
        throw e;
    }
}
const findStudent = {
    getStudentByEmail,
    getStudentPassword,
    getStudentByGoogleId,
    getStudentByStudentId,
    findAllStudentParticipant,
    getStudentBySbo
};

export default findStudent;