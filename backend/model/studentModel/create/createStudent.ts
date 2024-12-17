import pool from "../../../configs/db/pool";

const createStudentByLocal = async(id_num: number, email: string, fullname: string, password: string,sbo_name: string) =>{
    try{    
        await pool.query('INSERT INTO student(id_num,student_email,fullname,password, sbo_name) values ($1,$2,$3,$4,$5)', [id_num,email,fullname,password,sbo_name]);
        console.log("created!");
    } catch(e){
        console.log(e);
    }
}

const createStudentByGoogle = async(id_num: number, email: string, fullname:string, password:string, google_id: string, sbo_name:string) =>{
    try{
        await pool.query('INSERT INTO student(id_num, student_email, fullname, password, google_id, sbo_name) values ($1,$2,$3,$4,$5,$6)', [id_num,email,fullname,password,google_id,sbo_name]);
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