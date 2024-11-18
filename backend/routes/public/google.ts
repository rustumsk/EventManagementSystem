import { Router } from "express";
import passport from "passport";
const googleRoute = Router();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // Use OAuth 2.0 instead of OIDC
import { generateToken } from "../../helper/auth/jwt";
import findStudent from "../../model/studentModel/view/findStudent";
import createStudent from "../../model/studentModel/crud/createStudent";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_C_ID,
    clientSecret: process.env.GOOGLE_C_SECRET,
    callbackURL: '/google/oauth2/redirect/google',
    scope: ['profile', 'email'],
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        if (!email) {
            return done(new Error("No email found in Google profile"), null);
        }

        
        const existingUser = await findStudent.getStudentByGoogleId(profile.id);
        
        if (existingUser.rows && existingUser.rows.length > 0) {
            const token = generateToken(email);
            return done(null, token); 
        }

        await createStudent.createStudentByGoogle(123223, 'fullname', email, profile.id);
        const user = await findStudent.getStudentByEmail(email);
        const userToken = generateToken(email);
        const obj = {
            userToken,
            user
        }
        return done(null, obj);

    } catch (e) {
        console.error("Error during Google authentication:", e);
        done(e, null);
    }
}));


googleRoute.get('/', passport.authenticate('google', { session: false }));
googleRoute.get('/oauth2/redirect/google', passport.authenticate('google', { session: false }), (req, res) => {
    res.json({ token: req.user });
});

export default googleRoute;