import { error } from "console";
import pool from "../../../configs/db/pool";

const createDraft = async(sbo_id:number, draft_name:string, event_data:any) =>{
    try{
        await pool.query(`INSERT INTO draft(sbo_id, draft_name, event_data) VALUES($1,$2,$3)`, [sbo_id, draft_name, event_data]);
        console.log("Draft Created!");
    }
    catch(e){
        console.log(e);
        throw error(e);
    }
}

export default createDraft;