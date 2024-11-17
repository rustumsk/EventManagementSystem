import { Router } from "express";
import passport from "passport";
const googleRoute = Router();

googleRoute.get('/', passport.authenticate('google'));