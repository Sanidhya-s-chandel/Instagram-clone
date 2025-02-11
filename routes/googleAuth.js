const express = require("express");
const passport = require("passport");
const router = express.Router();


router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/SignUp",
        successRedirect: "/Profile", 
    })
);

// Profile route update karna h

module.exports = router;