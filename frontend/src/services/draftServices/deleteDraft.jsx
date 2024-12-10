import axios from "axios";

const deleteDraftById = async(authToken, draft_id) =>{
    try{
        const result = await axios.delete(`http://localhost:3000/draft/${draft_id}`, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log(result.data)
    }catch(e){
        console.log(e);
    }
}

export {deleteDraftById}