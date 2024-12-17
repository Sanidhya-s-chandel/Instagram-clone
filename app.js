require("dotenv").config();
const express = require("express");
const app = express();
const userModel = require("./models/user.model");
const SignUp = require("./routes/signUp")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');


const saltRounds = parseInt(process.env.salt_rounds,10);
const Key = process.env.key


require("./config/db.config");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(flash());


app.get("/",(req,res)=>{
    res.render("index");
});

app.use("/SignUp",SignUp);

app.get("/login",(req,res)=>{
    res.send("login")
});

app.listen(3000,()=>{
    console.log("Server running at port: 3000");
});