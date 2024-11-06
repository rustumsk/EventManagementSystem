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
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        midinit CHAR(1),
        password VARCHAR(255),  -- Fixed typo here
        is_notif BOOLEAN,
        is_verified BOOLEAN,
        verification_token VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS Category (
        category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category_name VARCHAR(255)  -- Added length to the category_name column
    );

    CREATE TABLE IF NOT EXISTS Location (
        location_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        location_city VARCHAR(255),
        location_street VARCHAR(255),
        location_country VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS Event (
        event_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_id INT,
        event_description TEXT,
        event_name VARCHAR(255),
        event_date TIMESTAMP,  -- Replaced datetime with timestamp
        location_id INT,
        category_id INT,
        capacity INT,
        ends_at TIMESTAMP,  -- Replaced datetime with timestamp
        custom_fields JSON,
        FOREIGN KEY (sbo_id) REFERENCES Sbo(sbo_id),
        FOREIGN KEY (location_id) REFERENCES Location(location_id),
        FOREIGN KEY (category_id) REFERENCES Category(category_id)
    );

    CREATE TABLE IF NOT EXISTS Draft(
        draft_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_id INT,
        draft_name VARCHAR(255),
        event_data json,
        created_at timestamp,
        updated_at timestamp,
        status VARCHAR(255),
        FOREIGN KEY (sbo_id) REFERENCES Sbo(sbo_id)
    );

    CREATE TABLE IF NOT EXISTS Feedback(
        feedback_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        event_id INT,
        student_id INT,
        rating INT,
        FOREIGN KEY (event_id) References Event(event_id),
        FOREIGN KEY (student_id) References Student(student_id)
    );

    CREATE TABLE IF NOT EXISTS Notification(
        notification_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        student_id INT,
        notif_email boolean,
        notif_type varchar(255),
        create_at timestamp,
        FOREIGN KEY (student_id) References Student(student_id)
    );

    CREATE TABLE IF NOT EXISTS Participant(
        participant_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        event_id INT,
        student_id INT,
        registered_at timestamp,
        attendance_status varchar(255),
        checked_in boolean,
        custom_responses JSON,
        FOREIGN KEY (student_id) References Student(student_id),
        FOREIGN KEY (event_id) References Event(event_id) 
    );

    CREATE TABLE IF NOT EXISTS Support(
        support_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_id INT,
        support_question text,
        created_at timestamp,
        status varchar(255),
        FOREIGN KEY (sbo_id) References Sbo(sbo_id)
    );

    CREATE TABLE IF NOT EXISTS SupportAnswer(
        support_answer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        support_id INT,
        answer_text text,
        answered_at timestamp,
        FOREIGN KEY (support_id) References Support(support_id)
    );

    CREATE TABLE IF NOT EXISTS EventImage(
        event_image_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        event_id INT,
        image_url varchar(255),
        FOREIGN KEY (event_id) References Event(event_id)
    );

    CREATE TABLE IF NOT EXISTS StudentImage(
        student_image_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        student_id INT,
        image_url varchar(255),
        FOREIGN KEY (student_id) References Student(student_id)
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