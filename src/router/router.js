const express = require('express');
const app = express();
const authRouter = require('../modules/auth/auth.router');
const userRouter = require('../modules/admin/admin.router');
const banner = require('../modules/banner/banner.router');
const brand = require("../modules/brand/brand.router");
const category = require("../modules/category/category.router");
const product = require("../modules/product/product.router");
const admin = require("../modules/admin/admin.router")

app.use('/auth' , authRouter);
app.use('/userRouting' , userRouter);
app.use('/banner', banner );
app.use('/brand', brand);
app.use('/category', category);
app.use('/admin', admin)

 module.exports = app;