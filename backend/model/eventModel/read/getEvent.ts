import pool from "../../../configs/db/pool";
const getFeaturedEvent = async () => {
    try{
        const data = await pool.query('SELECT * FROM event LIMIT 8');
        return data.rows;
    }catch(e){
        console.log(e);
        return (e);
    }
}
const getMyEventWithId = async (sbo_id: any) =>{
    try{
        const data = await pool.query('SELECT * FROM event where sbo_id = $1', [sbo_id]);
        return data.rows;
    }catch(e){
        console.log(e);
        return (e);
    }
}

const getEventByIdNameDate = async(sbo_id: any, event_name:any, event_date: any) =>{
    try{
        const result = await pool.query('SELECT * from event where sbo_id = $1 AND event_name = $2 AND event_date = $3', [sbo_id, event_name, event_date]);
        return result.rows;
    }catch(e){
        console.log(e);
        throw(e);
    }
}

const getEvent = {
    getFeaturedEvent,
    getMyEventWithId,
    getEventByIdNameDate
};

export default getEvent