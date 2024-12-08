import { Router } from "express";
import passport from "passport";
const googleRoute = Router();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // Use OAuth 2.0 instead of OIDC
import { generateIdToken, generateToken, generateTokenForPayload, generateUserToken } from "../../helper/auth/jwt";
import { CustomUser } from "../../configs/types/type";
import findStudent from "../../model/studentModel/read/findStudent";
import createStudent from "../../model/studentModel/create/createStudent";

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
            console.log(typeof existingUser.rows[0].student_id);
            console.log(existingUser.rows[0].student_id);
            const token = generateUserToken(existingUser.rows[0].student_id);

            console.log(token);
            return done(null, {
                type: 'existingUser',
                token: token,
            }); 
        }

        const addInfo = {
            email: profile.emails[0].value,
            google_id: profile.id
        }

        return done(null, {
            type: 'newUser',
            addInfo
        });

    } catch (e) {
        console.error("Error during Google authentication:", e);
        done(e, null);
    }
}));


googleRoute.get('/', passport.authenticate('google', { session: false }));


googleRoute.get('/oauth2/redirect/google', passport.authenticate('google', { session: false }), (req, res): any => {

    const userData = req.user as CustomUser;
    if (!userData){
        return res.status(404).json({message: 'user data is missing!'});
    }

    if (userData.type === 'existingUser'){
        console.log(`Inside: ${userData.token}`);
        res.redirect(`http://localhost:5173/studentdashboard?usertoken=${userData.token}`);
    }

    if (userData.type ==='newUser'){
        const token = generateTokenForPayload(userData.addInfo?.email, userData.addInfo?.google_id)
        res.redirect(`http://localhost:5173/signup/complete-profile?aInfo=${token}`);
    }
});

export default googleRoute;