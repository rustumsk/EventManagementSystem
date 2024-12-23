import pool from "../../../configs/db/pool"

const createEvent = async (sbo_id:number, event_description:string, event_name:string ,event_date:any,start_time:any, end_time:any,location_id:number,category_id:number, capacity:string,
                            ends_at:any,event_image: any, custom_field:any, event_type: any) =>{
    try{
        await pool.query(`INSERT INTO Event(sbo_id,event_description, event_name, event_date,start_time,end_time,location_id, category_id, capacity, ends_at,event_image, custom_fields, event_type)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11,$12,$13)`, [sbo_id,event_description,event_name,event_date,start_time,end_time,location_id,category_id,capacity,ends_at,event_image,custom_field, event_type]);
        console.log("Event Created!");
        return true;
    }catch(e){
        console.log(e);
        throw e;
    }
    
}

export {createEvent}