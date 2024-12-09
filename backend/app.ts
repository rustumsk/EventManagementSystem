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
import studentRouter from './routes/private/student';
import eventRouter from './routes/private/event';
import imageRoute from './routes/services/image';
import categoryRoute from './routes/public/category';
import sboRoute from './routes/private/sbo';
import locationRoute from './routes/services/location';
import draftRoute from './routes/private/draft';
import participantRoute from './routes/private/participant';
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
app.use('/students', studentRouter);
app.use('/events', eventRouter);
app.use('/convert', imageRoute);
app.use('/sbo', sboRoute);
app.use('/category', categoryRoute);
app.use('/draft', draftRoute);
app.use('/location', locationRoute);
app.use('/participant', participantRoute);
popul();
app.post('/mail', (req,res) =>{
    const {code,email} = req.body
    // sendVerificationCode(req.body.email, req.body.code);
    res.send(email);
})


app.listen(PORT, () =>{
    console.log(`Listening at PORT: ${PORT}`);
})