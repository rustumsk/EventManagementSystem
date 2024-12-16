import axios from "axios";

const updateStudentStatus = async(authToken,student_id) =>{
    try{
        const result = await axios.patch(`http://localhost:3000/students/status`,{student_id:student_id}, {
            headers:{
                "Authorization": `Bearer ${authToken}`
            }
        })
        return result;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {updateStudentStatus};