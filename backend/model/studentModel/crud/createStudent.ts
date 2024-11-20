import pool from "../../../configs/db/pool";

const createStudentByLocal = async(id_num: number, email: string, fullname: string, password: string) =>{
    try{    
        console.log(typeof email);
        await pool.query('INSERT INTO student(id_num,student_email,fullname,password) values ($1,$2,$3,$4)', [id_num,email,fullname,password]);
        console.log("created!");
    } catch(e){
        console.log(e);
    }
}

const createStudentByGoogle = async(id_num: number, fullname: string, password:string, email:string, google_id: string) =>{
    try{
        await pool.query('INSERT INTO student(id_num, student_email, fullname, password, google_id) values ($1,$2,$3,$4,$5)', [id_num,email,fullname,password,google_id]);
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