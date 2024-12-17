require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userModel = require("../models/user.model");
const flash = require('connect-flash');


const saltRounds = parseInt(process.env.salt_rounds,10);
const Key = process.env.key


require("../config/db.config");
router.use(express.json());
router.use(express.urlencoded ({ extended: true }));
router.use(cookieParser())
router.use(flash())


router.post("/SignUp", async (req,res)=>{
    let {username,email,password,name} = req.body;

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
                req.flash("Could Not Create User OR it already exists..")
                res.redirect("/login");
            }else{
                req.flash("User Created Sucessfully......")
                res.redirect("/login");
            }
        })
    })
});

module.exports = router;