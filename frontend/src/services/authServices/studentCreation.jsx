import axios from "axios";

const createGoogleStudent = async (id_num, email, fullname, password, google_id ) => {
    const result = await axios.post('http://localhost:3000/signup/google',{
        id_num,
        email,
        fullname,
        password,
        google_id
    });
    return result
}

export {createGoogleStudent};