import axios from "axios";

const getStudentById = async(authToken,student_id) =>{
    const data = await axios.get(`http://localhost:3000/students/${student_id}`,{
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return data;
}

const getStudent = {
    getStudentById
};

export default getStudent;