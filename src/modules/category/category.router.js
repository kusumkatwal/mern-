const express = require('express');
const PermissionCheck = require('../../middleware/rbac.middleware');
const authCheck = require("../../middleware/auth.middleware")
const {categoryCreateSchema} = require('./category.request')
const {validator} = require('../../middleware/validate.middleware')
const uploader = require('../../middleware/uploader.middleware')
const categoryCtrl = require('./category.controller')
const USER_ROLES = require('../../config/constants.config')
const category = express();

category.get("/home", categoryCtrl.loginHome)
category.route('/')
    .post(authCheck, PermissionCheck(USER_ROLES.admin),uploader.single('image'),validator(categoryCreateSchema),categoryCtrl.createCategory)
    .get(authCheck, PermissionCheck(USER_ROLES.admin),categoryCtrl.listAllCategories)
category.route ('/:id')
    .get(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        categoryCtrl.getCategoryDetail
        )
    .put(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        uploader.single('image'),
        validator(categoryCreateSchema),
        categoryCtrl.updateById
    )
    .delete(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        categoryCtrl.deleteById
    )


// category.post('/category-list', (req,res, next) => {
//     res.json({
//         result: "Category list",
//         message: "mounted",
//         meta: null
//     })
// })

// category.post('/category-list/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Category no " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// category.post('/category-detail/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Category details of " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// category.post('/category-update/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Category updated on " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// category.post('/category-delete/:token', (req,res,next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Category no " + id + "deleted successfully",
//         message: "mounted",
//         meta: null
//     })
// })

module.exports = category;

