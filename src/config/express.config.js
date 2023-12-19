const express = require('express');

const app = express()
//everything has to be mounted on app variable

//route
// / 
app.use('/', (req,res)=>{
    //res.end("First express output.")
    console.log(req.url);
    res.json({
        result: "Helloworld",
        mesaage: "Notification",
        meta: null
    })
})
module.exports = app;

