import * as dotenv from 'dotenv';
import { Client } from 'pg';
dotenv.config();

const SQL = `
    CREATE TABLE IF NOT EXISTS admins (
        admin_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        contact_num VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        id_number INT UNIQUE NOT NULL,
        profile_url VARCHAR(255),
        gender VARCHAR(255),
        get_notif BOOLEAN
    );
`;

const popul = async () =>{
    try{
        const client = await new Client({
            connectionString: process.env.DEVCONNECT,
        });
        await client.connect();
        console.log("Connected!");
        await client.query(SQL);
        console.log("Done!");
        await client.end();

    }catch(e){
        console.log(e);
    }
}

export default popul;