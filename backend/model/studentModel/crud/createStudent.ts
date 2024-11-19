import pool from "../../../configs/db/pool";

const createStudentByLocal = async(fullname: string, id_num: number, email: String, password: String) =>{
    try{
        await pool.query('INSERT INTO student(fullname,id_num,student_email,password) values ($1,$2,$3,$4)', [fullname,id_num,email,password]);
        console.log("created!");
    } catch(e){
        console.log(e);
    }
}

const createStudentByGoogle = async(id_num: number, fullname: string,password:string, email:string, google_id: string) =>{
    try{
        await pool.query('INSERT INTO student(fullname,id_num,student_email,password,google_id) values ($1,$2,$3,$4,$5)', [fullname,id_num,email,password,google_id]);
        console.log("Created!");
    }catch(e){
        console.log(e);
    }
}
const createStudent = {
    createStudentByLocal,
    createStudentByGoogle
}

export default createStudent;