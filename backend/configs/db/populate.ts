import * as dotenv from 'dotenv';
import { Client } from 'pg';
dotenv.config();

const SQL = `
    CREATE TABLE IF NOT EXISTS admin(
        admin_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        admin_name VARCHAR(255) UNIQUE NOT NULL,
        admin_password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Sbo (
        sbo_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_email VARCHAR(255) UNIQUE NOT NULL,
        sbo_password VARCHAR(255) NOT NULL,
        sbo_name VARCHAR(255) UNIQUE NOT NULL,
        sbo_image VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dkjvr8efj/image/upload/v1733383626/uploads/Avatar.png.png',
        is_verified boolean DEFAULT FALSE,
        contact_num VARCHAR(20) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Student (
        student_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        id_num INT NOT NULL UNIQUE,
        student_email VARCHAR(255) NOT NULL UNIQUE,
        fullname VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        facebook_id VARCHAR(255) UNIQUE,
        google_id VARCHAR(255) UNIQUE,
        sbo_name VARCHAR(255) NOT NULL,
        student_image VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dkjvr8efj/image/upload/v1733383626/uploads/Avatar.png.png', 
        is_notif BOOLEAN DEFAULT FALSE,
        is_verified BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (sbo_name) REFERENCES Sbo(sbo_name)
    );

    CREATE TABLE IF NOT EXISTS Category (
        category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category_name VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Location (
        location_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        location_city VARCHAR(255) NOT NULL,
        location_name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Event (
        event_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_id INT NOT NULL,
        event_description TEXT NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        event_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        location_id INT NOT NULL,
        category_id INT NOT NULL,
        capacity INT NOT NULL,
        ends_at TIMESTAMP NOT NULL, 
        event_image VARCHAR(255) NOT NULL,
        custom_fields JSON,
        event_type VARCHAR(255) NOT NULL,
        is_done BOOLEAN DEFAULT FALSE,
        is_open BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (sbo_id) REFERENCES Sbo(sbo_id),
        FOREIGN KEY (location_id) REFERENCES Location(location_id),
        FOREIGN KEY (category_id) REFERENCES Category(category_id)
    );

    -- Add unique constraint for event_name, event_date, and sbo_id
    ALTER TABLE Event
    ADD CONSTRAINT unique_event_name_date UNIQUE (sbo_id, event_name, event_date);

    CREATE TABLE IF NOT EXISTS Draft (
        draft_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_id INT,
        draft_name VARCHAR(255) NOT NULL,
        event_data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        status BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (sbo_id) REFERENCES Sbo(sbo_id)
    );

    CREATE TABLE IF NOT EXISTS Feedback (
        feedback_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        event_id INT NOT NULL,
        student_id INT NOT NULL,
        rating INT NOT NULL,
        feedback TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES Event(event_id),
        FOREIGN KEY (student_id) REFERENCES Student(student_id),
        CONSTRAINT unique_feedback UNIQUE (event_id, student_id)
    );

    CREATE TABLE IF NOT EXISTS Notification (
        notification_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        student_id INT,
        notif_email BOOLEAN,
        notif_type VARCHAR(255),
        created_at TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES Student(student_id)
    );

    CREATE TABLE IF NOT EXISTS Participant (
        participant_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        event_id INT NOT NULL,
        student_id INT NOT NULL,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        attendance_status VARCHAR(255) DEFAULT 'Not Attended',
        checked_in BOOLEAN DEFAULT false,
        custom_responses JSON,
        FOREIGN KEY (student_id) REFERENCES Student(student_id),
        FOREIGN KEY (event_id) REFERENCES Event(event_id),
        CONSTRAINT unique_event_participant UNIQUE (event_id, student_id) -- Ensures no duplicate participant per event
    );

    CREATE TABLE IF NOT EXISTS Support (
        support_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sbo_id INT,
        support_question TEXT,
        created_at TIMESTAMP,
        status VARCHAR(255),
        FOREIGN KEY (sbo_id) REFERENCES Sbo(sbo_id)
    );

    CREATE TABLE IF NOT EXISTS SupportAnswer (
        support_answer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        support_id INT,
        answer_text TEXT,
        answered_at TIMESTAMP,
        FOREIGN KEY (support_id) REFERENCES Support(support_id)
    );

    -- Insert default categories
    INSERT INTO Category(category_name) VALUES 
    ('Trade'), ('Seminar'), ('Conference'), ('Festival');
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