const express = require("express");
const router = express.Router();

router.route('/list')
    .get((res, req, nest)=>{
        res.json({
            result: "USer",
            message: " User router mounted", 
            meta: null
        })

    })
    .post((req, res, next) => {
        res.json({
            result: "User list",
            message: "mounted",
            meta:null 
        })
    })



router.post('/list', (req,res, next) => {
    res.json({
        result: "User list",
        message: "mounted",
        meta:null 
    })
})

router.post('/filtered-list/:id' , (req,res, next) => {
    var id = req.params.id;
    res.json({
        result: "User no " + id,
        message: "filtered user mounted",
        meta: null
    })
})

router.post('/user-detail/:id' , (req,res, next) => {
    var id = req.params.id;
    res.json({
        result: "User detail of " + id,
        message: "user details mounted",
        meta: null
    })
})

router.post('/user-update/:id' , (req,res, next) => {
    var id = req.params.id;
    res.json({
        result: "User details updated on " + id,
        message: "user mounted",
        meta: null
    })
})

router.post('/user-delete/:id' , (req,res, next) => {
    var id = req.params.id;
    res.json({
        result: "User details deleted on " + id,
        message: "user mounted",
        meta: null
    })
})

module.exports = router;