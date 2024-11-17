import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oidc';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_C_ID,
    clientSecret: process.env.GOOGLE_C_SECRET,
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
}))