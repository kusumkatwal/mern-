const express = require('express');
const router = express(); 
const authcheck = require('../../middleware/auth.middleware')
const authCtrl = require("./auth.controller")
const {validator, paramValidator, passwordValidator, loginValidator, forget_password_validator} = require ('../../middleware/validate.middleware')
const {registerSchema, activationToken, passwordSchema, loginSchema, forget_password_schema} = require('./auth.request')
const uploader = require("../../middleware/uploader.middleware")

/**Register User */
router.post('/register',uploader.single('image'),validator(registerSchema), authCtrl.register)
router.get("/verify/:token" ,paramValidator(activationToken), authCtrl.verify)
router.post("/activation/:token", paramValidator(activationToken),passwordValidator(passwordSchema) ,authCtrl.activation)
//controller
/**Login Process */
router.post("/login",loginValidator(loginSchema),authCtrl.login)

router.get("/me", authcheck, authCtrl.getLoggedInUser);
router.get("/logout",authcheck, authCtrl.logout )

/**Forget Password */
router.post("/forget-password", forget_password_validator(forget_password_schema),authCtrl.forget_password)
router.post("/verify-password-token/:token",paramValidator(activationToken),authCtrl.reset_password )
router.post ("/set-password/:token",paramValidator(activationToken),authCtrl.set_password )



module.exports = router;