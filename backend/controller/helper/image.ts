import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads",
        format: "png",     
        public_id: (req:Request, file:any) => file.originalname, 
    } as any, 
});

const upload = multer({ storage });
