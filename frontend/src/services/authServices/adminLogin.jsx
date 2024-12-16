import axios from "axios";

const adminLogin = async (admin_name, admin_password) =>{
    const data = {
        admin_name: admin_name,
        admin_password: admin_password
    }
    try{
        const result = await axios.post("http://localhost:3000/login/admin", data);
        localStorage.setItem('adminToken', result.data.token);
        return result.data.token;
    }catch(e){
        console.log(e);
        throw e.response.data;
    }
}

export {adminLogin}