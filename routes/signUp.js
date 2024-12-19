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
    let {username,email,password,name} = req.body;

    const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            req.flash("error","Could Not Create User OR it already exists..");
            return res.redirect("/login");
        }

    bcrypt.genSalt(saltRounds, (err,salt)=>{
        bcrypt.hash(password,salt, async (err, hash)=> {
            
            await userModel.create({
                username,
                email,
                password: hash,
                name
            })

            let token = jwt.sign({ email }, Key); 
            res.cookie("token", token);
            
            if(err){
                req.flash("error","Could Not Create User OR it already exists..")
                res.redirect("/login");
            }else{
                req.flash("sucess","User Created Sucessfully......")
                res.redirect("/login");
            }
        })
    })
});


module.exports = router;