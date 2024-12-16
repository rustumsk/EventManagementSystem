import axios from "axios";

const createSbo = async(sbo_email, sbo_name, password,contact_num) =>{
    const data = {
        sbo_email: sbo_email,
        sbo_name: sbo_name,
        sbo_password: password,
        contact_num: contact_num
    };
    try{
        const result = await axios.post('http://localhost:3000/signup/SBO', data);
        return result
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {createSbo};