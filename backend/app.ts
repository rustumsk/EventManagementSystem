import {Request,Response} from 'express';
import express from 'express';
import * as dotenv from 'dotenv';
const app = express();
import cors from 'cors';
import popul from './configs/db/populate';
import signupRoute from './routes/public/signup';
import loginRoute from './routes/public/login';
dotenv.config();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get('/oauth2/redirect/google',(req: Request,res: Response) =>{
    res.send("Hello!");
});

app.use('/signup',signupRoute);
app.use('/login', loginRoute);

app.listen(PORT, () =>{
    console.log(`Listening at PORT: ${PORT}`);
})