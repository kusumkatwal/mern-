const express = require('express');
const PermissionCheck = require('../../middleware/rbac.middleware');
const authCheck = require("../../middleware/auth.middleware")
const {bannerCreateSchema} = require('./banner.request')
const {validator} = require('../../middleware/validate.middleware')
const uploader = require('../../middleware/uploader.middleware')
const bannerCtrl = require('./banner.controller')
const USER_ROLES = require('../../config/constants.config')
const banner = express();

banner.get("/home", bannerCtrl.loginHome)
banner.route('/')
    .post(authCheck, PermissionCheck(USER_ROLES.admin),uploader.single('image'),validator(bannerCreateSchema),bannerCtrl.createBanner)
    .get(authCheck, PermissionCheck(USER_ROLES.admin),bannerCtrl.listAllBanners)
banner.route ('/:id')
    .get(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        bannerCtrl.getBannerDetail
        )
    .put(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        uploader.single('image'),
        validator(bannerCreateSchema),
        bannerCtrl.updateById
    )
    .delete(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        bannerCtrl.deleteById
    )


// banner.post('/banner-list', (req,res, next) => {
//     res.json({
//         result: "Banner list",
//         message: "mounted",
//         meta: null
//     })
// })

// banner.post('/banner-list/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Banner no " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// banner.post('/banner-detail/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Banner details of " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// banner.post('/banner-update/:token', (req,res, next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Banner updated on " + id,
//         message: "mounted",
//         meta: null
//     })
// })

// banner.post('/banner-delete/:token', (req,res,next) => {
//     let id = req.params.token;
//     res.json({
//         result: "Banner no " + id + "deleted successfully",
//         message: "mounted",
//         meta: null
//     })
// })

module.exports = banner;

