import pool from "../../../configs/db/pool";

const getLocationById = async(location_id: any) =>{
    try{
        const data = await pool.query('SELECT location_name, location_city from location where location_id = $1', [location_id]);
        return data.rows;
    }catch(e){
        console.log(e);
    }
}

export{getLocationById};