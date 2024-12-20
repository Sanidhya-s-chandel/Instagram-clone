const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("../models/user.model");


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ googleId: profile.id });
            if (!user) {
                user = await userModel.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0]?.value,
                    username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});