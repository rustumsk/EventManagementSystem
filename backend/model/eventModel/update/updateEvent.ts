import pool from "../../../configs/db/pool";

const updateIsOpen = async(event_id:any) =>{
    try{
        await pool.query("UPDATE event SET is_open = TRUE WHERE event_id = $1", [event_id]);
    }catch(e){
        throw e;
    }
}

const updateIsDone = async(event_id: any) =>{
    try{
        await pool.query("UPDATE event SET is_done = TRUE WHERE event_id = $1", [event_id]);
    }catch(e){
        throw e;
    }
}

export {updateIsOpen, updateIsDone};