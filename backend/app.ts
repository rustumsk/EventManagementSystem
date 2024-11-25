import {Request,Response} from 'express';
import express from 'express';
import * as dotenv from 'dotenv';
const app = express();
import cors from 'cors';
import popul from './configs/db/populate';
import signupRoute from './routes/public/signup';
import loginRoute from './routes/public/login';
import googleRoute from './routes/public/google'; 
import jwtRouter from './routes/services/jwt';
import passport = require('passport');
import { sendVerificationCode } from './routes/services/mailer';
dotenv.config();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.use('/google', googleRoute);
app.use('/signup',signupRoute);
app.use('/login', loginRoute);
app.use('/jwt', jwtRouter);

app.post('/mail', (req,res) =>{
    const {code,email} = req.body
    // sendVerificationCode(req.body.email, req.body.code);
    res.send(email);
})

app.listen(PORT, () =>{
    console.log(`Listening at PORT: ${PORT}`);
})