const express = require("express");
const app = express();
app.use((req, res, next) => {
    next({
        code: 404,
        message: "Not found"
    })
})
//Error Handling middleware


module.exports = app;

// 