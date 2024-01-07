const express = require('express');
const router = require('../router/router');
require('./db.config');
const app = express()
// const errorRoutes = require('./error.config')

//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/api/v1' , router);
app.use((error, req, res, next) => {
    console.log("Garbage Collector")
    const code = error.code ?? 500;
    const message = error.message ?? "Server error";

    res.status(code).json({
        result: error,
        message: message,
        meta: null
    })
})
module.exports = app;

