import axios from "axios";

const createGoogleStudent = async (id_num, email, fullname, password, google_id, sbo_name ) => {
    try{
        const result = await axios.post('http://localhost:3000/signup/google',{
            id_num,
            email,
            fullname,
            password,
            google_id,
            sbo_name
        });
        return result
    }catch(e){
        console.log(e.message);
    }
}

const createLocalStudent = async(id_num, email,fullname,password, sbo_name) =>{
    const result = await axios.post('http://localhost:3000/signup', {
        id_num,
        email,
        fullname,
        password,
        sbo_name
    });
    return result;
}
export {createGoogleStudent, createLocalStudent};