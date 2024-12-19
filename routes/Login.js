require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userModel = require("../models/user.model");
const flash = require('connect-flash');
const expressSession = require("express-session");


const saltRounds = parseInt(process.env.salt_rounds,10);
const Key = process.env.key
const SessionKey = process.env.SessionKey


require("../config/db.config");
router.use(express.json());
router.use(express.urlencoded ({ extended: true }));
router.use(cookieParser())
router.use(flash())
router.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: SessionKey
}));


router.post("/", async (req,res)=>{

    let { username, password } = req.body;
    
    let user = await userModel.findOne({ username });
    if (!user) {
        req.flash("error2", "username or password is incorrect.");
        return res.redirect("/login");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ username }, Key); 
            res.cookie("token", token);
            res.send("profile");
        }
        else {
            req.flash("error2", "username or password is incorrect.")
            res.redirect("/login");
        }
    });
})


module.exports = router;