const express = require('express');
const router = express(); 


router.post("/register" , (req,res) => {
    
    let data = "Register post routing";

    res.json({
        result: data,
        message: " Authentication mounted",
        meta: null
    })
})

router.get("/activation/:token" , (req,res) => {
    let id = req.params.token;
    let data =[
        {
            id: id,
            text: "Account no " + id + " activated"
        }
    ]

    res.json({
        result: data,
        message: "Activation mounted",
        meta: null
    })
})

router.post("/set-password/:token", (req,res) => {
    let id = req.params.token;

    let data =[
        {
            id: id,
            text: "Password set for " + id
        }
    ]

    res.json ({
        result: data,
        message: "Password mounted",
        meta: null
    })

})

router.post("/login", (req,res) => {
    res.json({
        result: "Login Routing",
        message: "mounted",
        meta: null
    })
})

router.post("/forget-password", (req,res) => {
    res.json ({
        result: "Forget password routing",
        message: "mounted",
        meta: null
    })
})

router.post("/reset-password", (req,res) => {
    res.json({
        result: "Reset password Routing",
        message: "mounted",
        meta: null
    })
})

router.get("/logout", (req,res) => {
    res.json({
        result: "Logout Routing",
        message: "mounted",
        meta: null
    })
})

router.post ("/rbac" , (req,res) => {
    res.json({
        result: "Role Based Access Control",
        message: "mounted",
        meta: null
    })
})


module.exports = router;