const express = require("express");
const router = express.Router();
const adminCtrl = require("./admin.controller")
const uploader = require('../../middleware/uploader.middleware')

router.route('/users')
    .get(adminCtrl.users)

router.put('/update/:token',uploader.single('image'), adminCtrl.update )
module.exports = router;