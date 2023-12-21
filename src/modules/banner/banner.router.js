const express = require('express');
const banner = express();

banner.post('/banner-create', (req,res) => {
    res.json({
        result: "Banner created successfully",
        message: "mounted",
        meta: null
    })
})

banner.post('/banner-list', (req,res) => {
    res.json({
        result: "Banner list",
        message: "mounted",
        meta: null
    })
})

banner.post('/banner-list/:token', (req,res) => {
    let id = req.params.token;
    res.json({
        result: "Banner no " + id,
        message: "mounted",
        meta: null
    })
})

banner.post('/banner-detail/:token', (req,res) => {
    let id = req.params.token;
    res.json({
        result: "Banner details of " + id,
        message: "mounted",
        meta: null
    })
})

banner.post('/banner-update/:token', (req,res) => {
    let id = req.params.token;
    res.json({
        result: "Banner updated on " + id,
        message: "mounted",
        meta: null
    })
})

banner.post('/banner-delete/:token', (req,res) => {
    let id = req.params.token;
    res.json({
        result: "Banner no " + id + "deleted successfully",
        message: "mounted",
        meta: null
    })
})

module.exports = banner;

