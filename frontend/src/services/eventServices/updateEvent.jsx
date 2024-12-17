import { th } from "@faker-js/faker";
import axios from "axios";

const updateIsOpen = async(authToken, event_id) =>{
    try{
        const data = await axios.patch('http://localhost:3000/events/isopen', {event_id}, {headers:{
            'Authorization': `Bearer ${authToken}`
        }});
        console.log(data);
    }catch(e){
        throw e;
    }
}

const updateIsDone = async(authToken, event_id) =>{
    try{
        const data = await axios.patch('http://localhost:3000/events/isdone', {event_id}, {headers:{
            'Authorization': `Bearer ${authToken}`
        }});
        console.log(data);
    }catch(e){
        throw e;
    }
}
export {updateIsOpen, updateIsDone};