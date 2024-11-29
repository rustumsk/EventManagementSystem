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

const getEvent = {
    getFeaturedEvent
};

export default getEvent