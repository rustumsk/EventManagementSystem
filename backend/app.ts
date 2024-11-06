import express, {Request,Response} from 'express';
import * as dotenv from 'dotenv';
const app = express();
import popul from './configs/db/populate';
dotenv.config();

app.get('/',(req: Request,res: Response) =>{
    res.send("Hello!");
});

popul();
app.listen(process.env.PORT, () =>{
    console.log(`Listening at PORT: ${process.env.PORT}`);
})