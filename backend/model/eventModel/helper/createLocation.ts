import pool from "../../../configs/db/pool"

const createLocation = async(location_city:string, location_name:string) =>{
    try{
        const id = await pool.query('INSERT INTO Location(location_city, location_name) VALUES($1,$2) RETURNING location_id', [location_city,location_name]);
        const locationId = id.rows[0].location_id;
        return locationId;
    }catch(e){
        console.log(e);
    }
}

export default createLocation