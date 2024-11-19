import axios from "axios";

const genToken = async(fullname,id_number,password, email, google_id) =>{
    const token = await axios.post('http://localhost:3000/jwt', {fullname,id_number,password,email,google_id});
    return JSON.parse(token);
}