import dotenv from "dotenv";
dotenv.config(); // This ensures environment variables are loaded

import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
const imageRoute = Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,  // Use CLOUD_API
    api_secret: process.env.CLOUD_SECRET,  // Use CLOUD_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads",
        format: "png",     
        public_id: (req: Request, file: any) => file.originalname, 
    } as any, 
});

const upload = multer({ storage });

imageRoute.post("/", upload.single("image"), (req, res) => {
    try {
        console.log(process.env.CLOUD_NAME, process.env.CLOUD_API, process.env.CLOUD_SECRET);  // Debug log to check the loaded values
        const file = req.file;
        if (!file) {
            throw new Error("No file received");
        }
        res.status(200).json({ url: file.path });  // Return the file URL from Cloudinary
    } catch (err) {
        const error = err as Error; 
        res.status(500).json({ error: error.message || "Failed to upload image" });
    }
});

export default imageRoute;