import {Request,Response} from 'express';
import express from 'express';
import * as dotenv from 'dotenv';
const app = express();
import cors from 'cors';
import popul from './configs/db/populate';
import signupRoute from './routes/public/signup';
import loginRoute from './routes/public/login';
import googleRoute from './routes/public/google'; 
import passport = require('passport');
dotenv.config();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.use('/google', googleRoute);
app.use('/signup',signupRoute);
app.use('/login', loginRoute);

popul();
app.listen(PORT, () =>{
    console.log(`Listening at PORT: ${PORT}`);
})