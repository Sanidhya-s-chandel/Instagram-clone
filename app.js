require("dotenv").config();
const express = require("express");
const app = express();
const userModel = require("./models/user.model");
const SignUp = require("./routes/signUp");
const Login = require("./routes/Login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const expressSession = require("express-session");
const googleAuthRoutes = require("./routes/googleAuth");
const passport = require("passport");


const saltRounds = parseInt(process.env.salt_rounds,10);
const Key = process.env.key
const SessionKey = process.env.SessionKey


require("./config/passport.config")
require("./config/db.config");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(flash());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: SessionKey
}));
app.use((req, res, next) => {
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    res.locals.error2Message = req.flash("error2");
    next();
});
app.use(passport.initialize());
app.use(passport.session());


app.get("/",(req,res)=>{
    res.render("index");
});

app.use("/SignUp",SignUp);
app.use("/Login",Login);
app.use(googleAuthRoutes);

app.get("/login",(req,res)=>{
    res.render("login",{
        successMessage: res.locals.successMessage,
        errorMessage: res.locals.errorMessage,
        error2Message: res.locals.error2Message
    })
});


app.listen(3000,()=>{
    console.log("Server running at port: 3000");
});