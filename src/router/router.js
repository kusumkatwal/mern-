const express = require('express');
const app = express();
const authRouter = require('../modules/auth/auth.router');
const userRouter = require('../modules/user/user.router');
const banner = require('../modules/banner/banner.router');
const brand = require("../modules/brand/brand.router");

app.use('/auth' , authRouter);
app.use('/userRouting' , userRouter);
app.use(banner );
app.use('/brand', brand);

 module.exports = app;