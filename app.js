const express = require('express');
const app = express();
require("dotenv").config();
const expressSession = require("express-session");
const flash = require("connect-flash");

const cookieParser = require('cookie-parser');
const path = require('path');
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const loginRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(flash());   
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,    
    })
);

app.set("view engine","ejs");


app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/",loginRouter);


app.listen(3000);