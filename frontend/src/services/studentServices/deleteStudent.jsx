import axios from "axios";

const deleteStudentById = async(authToken, student_id) =>{
    try{
        const result = await axios.delete(`http://localhost:3000/students/${student_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return result.data;
    }catch(e){
        console.log(e);
        throw e
    }
};

export {deleteStudentById};

