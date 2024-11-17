import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oidc';
import dotenv from 'dotenv';
import findStudent from "../../model/studentModel/view/findStudent";
import { generateToken } from "../../helper/auth/jwt";
import createStudent from "../../model/studentModel/crud/createStudent";


dotenv.config();

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_C_ID,
        clientSecret: process.env.GOOGLE_C_SECRET,
        callbackURL: '/oauth2/redirect/google',
        scope: ['profile'],
    }, async (issuer:any,profile:any,done:any) =>{
        try{
            const existingUser = await findStudent.getStudentByGoogleId(profile.id);

            if(existingUser.rows[0].length > 0){
                const email = existingUser.rows[9].email;
                const token = generateToken(email);
                return done(null,token);
            }

            const user = await createStudent.createStudentByGoogle(123223,'fullname',profile.emails[0].value,profile.id);
            const userToken = generateToken(profile.emails[0].value);
            return done(null, userToken);
        }catch(e){
            done(e,null);
        }
    }
))