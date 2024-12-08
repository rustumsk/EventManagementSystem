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

const getEvent = {
    getFeaturedEvent,
    getMyEventWithId
};

export default getEvent