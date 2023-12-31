const express = require('express');
const brand = express();

brand.get('/brand-create' , (req,res, next) => {
    res.json({
        result: "Brand successfully created.",
        message: "mounted brand routing",
        meta: null
    })
})

brand.get('/brand-list' , (req,res, next) => {
    res.json({
        result: "Brand list.",
        message: "mounted brand routing",
        meta: null
    })
})

brand.get('/brand-list/:token' , (req,res, next) => {
    let id = req.params.token;
    res.json({
        result: "Brand number " + id,
        message: "mounted brand routing",
        meta: null
    })
})

brand.get('/brand-detail/:token' , (req,res, next) => {
    let id = req.params.token;
    res.json({
        result: "Brand detail of " + id,
        message: "mounted brand routing",
        meta: null
    })
})

brand.get('/brand-update/:token' , (req,res, next ) => {
    let id = req.params.token;
    res.json({
        result: "Brand detail updated on  " + id,
        message: "mounted brand routing",
        meta: null
    })
})

brand.get('/brand-delete/:token' , (req,res, next) => {
    let id = req.params.token;
    res.json({
        result: "Brand detail deleted on  " + id,
        message: "mounted brand routing",
        meta: null
    })
})

module.exports = brand;