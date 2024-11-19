import axios from "axios";

const createGoogleStudent = async (id_number, email, fullname, password, google_id ) => {
    const result = await axios.post('http://localhost:3000/jwt',{
        id_number,
        email,
        fullname,
        password,
        google_id
    });
}