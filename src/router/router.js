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

app.get ('/about-us' , (req,res) => {
    let data = {
        id: 123,
        title: "About us Page",
        detail: "This is about us content",
        image: "",
        author: "Kusum"
    }

    res.json({
        result: data,
        message: "Data fetched",
        meta: null 
    })
})
app.post ('/about-us/user/:id' , (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        title: "About us post request",
        detail: "tHis is about us post req content",
        image: "",
        author: "Kusum"
    }

    res.json({
        result: data,
        message: "fetched",
        meta: null
    })
})
// app.use('/', (req,res)=>{
//     //res.end("First express output.")
//     console.log(req.url);
//     res.json({
//         result: "Hello World",
//         mesaage: "Notification",
//         meta: null
//     })
// })

app.post('/user/:id' , (req,res) => {
   let id = req.params.id;
   let data = {
    id: id,
    text: "user created succesfully"
   }

   res.json ({
    result: data,
    message: "created ",
    meta: null
   })
})

app.put('/user/:id' , (req,res) => {
    let id = req.params.id;
    let data = {
     id: id,
     text: "user updated succesfully for " + id
    }
 
    res.json ({
     result: data,
     message: "updated ",
     meta: null
    })
 })

 app.get('/user/:id' , (req,res) => {
    let id = req.params.id;
    let data = {
     id: id,
     text: "user details fetched succesfully for " + id
    }
 
    res.json ({
     result: data,
     message: "created ",
     meta: null
    })
 })

 app.delete('/user/:id' , (req,res) => {
    let id = req.params.id;
    let data = {
     id: id,
     text: "user deleted succesfully"
    }
 
    res.json ({
     result: data,
     message: "deleted",
     meta: null
    })
 })

 app.get('/users' , (req,res) => {
    res.json ({
     result: "users list",
     message: "list",
     meta: null
    })
 })

 module.exports = app;