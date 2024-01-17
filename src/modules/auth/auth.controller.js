require('dotenv').config();
const { randomString } = require('../../config/helper.config');
const authSvc = require('../auth/auth.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class AuthController {
    //todo: fnctions
    register = async (req, res, next) => {
        try {
            const payload = req.body;

            if (req.file) {
                console.log(req.file);
                payload.image = req.file.filename
            }


            // if(req.files) {
            //     const images = req.files.map((img) => img.filename)
            //     payload.image = images;
            // } 
            payload.activationToken = randomString(100)
            payload.status = 'notactivated';
            //DB store: mongodb
            
           
            const dbStatus = await authSvc.registerUser(payload);
            console.log(dbStatus)
            res.json({
                result: payload,
                message: "Register data",
                meta: null
            })
        } catch (exception) {
            next({
                code: 422,
                message: exception.message,
                result: null
            })  }
    }
    verify = async (req, res, next) => {
       try{
        const data = await authSvc.getUserByActivationToken(req.params.token)
        res.json({
            result: data,
            message: "",
            meta: null
        })
       }catch(exception) {
        console.log(exception)
        next(exception)
       }
       
    }
    activation = async (req, res, next) => {
        try {
            const userDetail = await authSvc.getUserByActivationToken(req.params.token)
            const data = {
                password: bcrypt.hashSync(req.body.password,10),
                activationToken: null,
                status: "activated"
            }
           
            const response = await authSvc.updateUserById(userDetail._id, data)
             res.json({
                    result: response,
                    message: "your account has been updated successfully.",
                    meta: null
                })
    
          

        } catch (exception) {
            console.log(exception);
            next({
               code: 422,
                message: exception.message,
                result: null
            })

        }
    }
    
    login = async (req, res, next) => {
       try {
        const {email, password} = req.body;
        const userDetails  = await authSvc.getUserByFilter({email})
        if(!userDetails) {
            throw {code: 422,
            message: "User doesn't exists.",
            result: {email}
        }
        }
        if(userDetails && userDetails.status == 'activated'){
            if(bcrypt.compareSync(password, userDetails.password)){
                const token = jwt.sign({
                    userId: userDetails._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1day",
                    subject: `${userDetails._id}`
                })
                res.json({
                    result:{
                        token: token,
                        type: "Bearer"
                    }, message: "User logged in succesfully",
                    meta: null
                })
            }
            
        }
        else{
            throw {
                code: 422,
                message: "User is not activated or is suspended",
                result: {email}
            }
        }
        res.json({
            result: userDetails,
            message: "mounted",
            meta: null
        })
       }catch (exception){
        next(exception)
       }
           
      
    }

    getLoggedInUser = (req, res, next) => {
        const loggedInUser = req.authUser;
        res.json({
            result: loggedInUser,
            message: "mounted",
            meta: null
        })
    }
    forget_password =async  (req, res, next) => {
        //TODO get email for forget password
        //share reset token to registerred account
        try{
            const{email} = req.body
            const userDetail = await authSvc.getUserByFilter({email:email})
            if(!userDetail) {
                throw{code: 422, message:"user doesnot exist" , result: email}
            }
            else{
                await authSvc.sendForgetPasswordMail(userDetail)
                res.json({
                    result:"",
                    message: "an email has been sent to the registered email please chech your email for further processing. ",
                    meta: null
                })
            }
            
           

        }catch(exception){
            console.log(exception  )
            next({
                code: 422,
                message: exception.messgae,
                meta: null
            })
        }

    }
    verifyForgetPasswordToken = async(req, res, next) => {
        try{
            let userDetail = await authSvcv.getUserByFilter({forgetPasswordToken: req.params.token})
            res.json({
                result: userDetail,
                message: "USer doesnot exists",
                meta: null 
            })
        }catch(exception) {
            throw exception
        }
    }
    reset_password = async(req, res, next) => {
     try{
        const userDetail = await authSvc.getUserByFilter({forgetPasswordToken: req.params.token})
        if(!userDetail) {
            throw{code: 422, messgae: "Token does not exist or already expired."}
        }else{
            const data = {
                password: bcrypt.hashSync(req.body.password,10),
                forgetPasswordToken: null,
                    }
                    const response = await authSvc.updateUserById(userDetail._id, data)
                    res.json({
                        result: response,
                        message: "your password has been updated sucessfully",
                        meta: null
                    })
        }
        
        
       }catch(exception){
        next(exception)
       }
    }
    logout = (req, res, next) => {
        //TODO ->logout logged in user
        res.json({
            result: "Logout Routing",
            message: "mounted",
            meta: null
        })
    }
    

}

const authCtrl = new AuthController()
module.exports = authCtrl