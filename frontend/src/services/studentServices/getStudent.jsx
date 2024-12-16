import axios from "axios";

const getStudentById = async(authToken,student_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/students/${student_id}`,{
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return data;
    }catch(e){
        console.log(e);
    }
}

const getAllParticipatedStudent = async(authToken, event_id) =>{
    try{
        const data = await axios.get(`http://localhost:3000/students/participant/${event_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return(data.data);
    }catch(e){  
        console.log(e);
    }
}

const getAllStudentBySbo = async(authToken, sbo_name) =>{
    try{
        const data = await axios.get(`http://localhost:3000/students/sbos/${sbo_name}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        return data.data;
    }catch(e){
        console.log(e);
    }
}
const getStudent = { 
    getStudentById,
    getAllParticipatedStudent,
    getAllStudentBySbo
};

export default getStudent;