import express, {Request,Response} from 'express';
import * as dotenv from 'dotenv';
const app = express();
dotenv.config();

app.get('/',(req: Request,res: Response) =>{
    res.send("Hello!");
});

app.listen(process.env.PORT, () =>{
    console.log(`Listening at PORT: ${process.env.PORT}`);
})