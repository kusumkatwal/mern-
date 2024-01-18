const express = require('express');
const PermissionCheck = require('../../middleware/rbac.middleware');
const authCheck = require("../../middleware/auth.middleware")
const {brandCreateSchema} = require('./brand.request')
const {validator} = require('../../middleware/validate.middleware')
const uploader = require('../../middleware/uploader.middleware')
const brandCtrl = require('./brand.controller')
const USER_ROLES = require('../../config/constants.config')
const brand = express();

brand.get("/home", brandCtrl.loginHome)
brand.route('/')
    .post(authCheck, PermissionCheck(USER_ROLES.admin),uploader.single('image'),validator(brandCreateSchema),brandCtrl.createBrand)
    .get(authCheck, PermissionCheck(USER_ROLES.admin),brandCtrl.listAllBrands)
brand.route ('/:id')
    .get(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        brandCtrl.getBrandDetail
        )
    .put(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        uploader.single('image'),
        validator(brandCreateSchema),
        brandCtrl.updateById
    )
    .delete(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        brandCtrl.deleteById
    )


// brand.post('/brand-list', (req,res, next) => {
//     res.json({
//         result: "Brand list",
//         message: "mounted",
//         meta: null
//     })
// })

// brand.post('/brand-list/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Brand no " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// brand.post('/brand-detail/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Brand details of " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// brand.post('/brand-update/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Brand updated on " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// brand.post('/brand-delete/:token', (req,res,next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Brand no " + id + "deleted successfully",
//         message: "mounted",
//         meta: null
//     })
// })

module.exports = brand;

