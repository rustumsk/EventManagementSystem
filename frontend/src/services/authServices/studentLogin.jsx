import axios from "axios";

const studentLogin = async (password, id_number = 0, email = "") =>{
    const data = id_number != 0? {
        id_number, password
    }: {email, password}
    try{
        const result = await axios.post("http://localhost:3000/login", data);
        return result;
    }catch(e){
        throw e.response.data;
    }
}

export {studentLogin}