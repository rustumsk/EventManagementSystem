import * as dotenv from 'dotenv';
import { Client } from 'pg';
dotenv.config();

const SQL = `
    CREATE TABLE IF NOT EXISTS Sbo (
        sbo_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_email VARCHAR(255) UNIQUE NOT NULL,
        sbo_password VARCHAR(255) NOT NULL,
        contact_num VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS Student (
        student_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        id_num INT NOT NULL,
        student_email VARCHAR(255) NOT NULL UNIQUE,
        firstname VARCHAR(255)
        lastname VARCHAR(255)
        midinit char
        password VARCAHR(255)
        is_notif boolean
        is_verified boolean
        verification_token varchar(255)
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