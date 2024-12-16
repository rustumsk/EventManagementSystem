import axios from "axios";

const sboLogin = async (email, sbo_password) =>{
    const data = {
        email,
        sbo_password
    }
    try{
        const result = await axios.post("http://localhost:3000/login/sbo", data);
        console.log(data);
        return result;
    }catch(e){
        console.log(e);
        throw e.response.data;
    }
}

export {sboLogin}