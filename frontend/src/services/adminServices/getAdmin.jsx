import axios from "axios";

const getAdminById = async(authToken, admin_id) =>{
    try{
        const result = await axios.get(`http://localhost:3000/admin/${admin_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`,
            }
        })
        return result.data;
    }catch(e){
        console.log(e);
        throw e;
    }
}

export {getAdminById};