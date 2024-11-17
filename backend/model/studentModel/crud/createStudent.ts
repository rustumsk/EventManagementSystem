import pool from "../../../configs/db/pool";

const createStudentByLocal = async(fullname: String, id_num: number, email: String, password: String) =>{
    try{
        await pool.query('INSERT INTO student(fullname,id_num,student_email,password) values ($1,$2,$3,$4)', [fullname,id_num,email,password]);
        console.log("created!");
    } catch(e){
        console.log(e);
    }
}

const createStudent = {
    createStudentByLocal
}

export default createStudent;