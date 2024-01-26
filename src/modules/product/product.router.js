const express = require('express');
const PermissionCheck = require('../../middleware/rbac.middleware');
const authCheck = require("../../middleware/auth.middleware")
const {productCreateSchema} = require('./product.request')
const {validator} = require('../../middleware/validate.middleware')
const uploader = require('../../middleware/uploader.middleware')
const productCtrl = require('./product.controller')
const USER_ROLES = require('../../config/constants.config')
const product = express();

product.get("/home", productCtrl.loginHome)
product.route('/')
    .post(authCheck, PermissionCheck([USER_ROLES.admin, USER_ROLES.seller]),uploader.array('images'),validator(productCreateSchema),productCtrl.createProduct)
    .get(authCheck, PermissionCheck([USER_ROLES.admin, USER_ROLES.seller]),productCtrl.listAllProducts)
product.route ('/:id')
    .get(
        authCheck,
        PermissionCheck([USER_ROLES.admin, USER_ROLES.seller]),
        productCtrl.getProductDetail
        )
    .put(
        authCheck,
        PermissionCheck([USER_ROLES.admin, USER_ROLES.seller]),
        uploader.array('images'),
        validator(productCreateSchema),
        productCtrl.updateById
    )
    .delete(
        authCheck,
        PermissionCheck(USER_ROLES.admin, USER_ROLES.seller),
        productCtrl.deleteById
    )


// product.post('/product-list', (req,res, next) => {
//     res.json({
//         result: "Product list",
//         message: "mounted",
//         meta: null
//     })
// })

// product.post('/product-list/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Product no " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// product.post('/product-detail/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Product details of " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// product.post('/product-update/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Product updated on " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// product.post('/product-delete/:token', (req,res,next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Product no " + id + "deleted successfully",
//         message: "mounted",
//         meta: null
//     })
// })

module.exports = product;

