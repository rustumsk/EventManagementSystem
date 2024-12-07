import axios from "axios";

const draftCreation = async(authToken, data) =>{
    try{
        axios.post('http://localhost:3000/draft', data, {
            headers:{
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log("Draft Created!");
    }catch(e){
        console.log(e);
    }
}
export default draftCreation