const { randomString } = require('../../config/helper.config');
const authSvc = require('../auth/auth.service')
const bcrypt = require('bcrypt')


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
    
    login = (req, res, next) => {
        
            res.json({
                result: req.body.user_name + "validated",
                message: "mounted",
                meta: null
            })
      
    }

    getLoggedInUser = (req, res, next) => {

        res.json({
            result: "Login Routing",
            message: "mounted",
            meta: null
        })
    }
    forget_password =async  (req, res, next) => {
        //TODO get email for forget password
        //share reset token to registerred account
        try{

            let payload = req.body;
            let dbStatus = true; 
            if(dbStatus) {
                let link = "http://reset-password//";
                let message = `<p> Dear ${payload.user},
                                 <br/>
                               Please click this link below to forget your password. 
                               <a href = "${link}">${link} </a> <br/>
                               Regards, <br/>
                               System Admin <br/>
                               <small>Please don't reply to this email.</small> `;

                               await  (new EmailService()).sendEmail(payload.email, "Reset your password", message)
            }

          
            res.json({
                result: payload,
                message: "mounted",
                meta: null
            })

        }catch(exception){
            console.log(exception  )
            next({
                code: 422,
                message: exception.messgae,
                meta: null
            })
        }

    }
    reset_password = (req, res, next) => {

        //TODO : set password for forget 
        res.json({
            result: "Reset password Routing",
            message: "mounted",
            meta: null
        })
    }
    logout = (req, res, next) => {
        //TODO ->logout logged in user
        res.json({
            result: "Logout Routing",
            message: "mounted",
            meta: null
        })
    }
    set_password = (req, res, next) => {
        res.json({
            result: "Role Based Access Control",
            message: "mounted",
            meta: null
        })
    }

}

const authCtrl = new AuthController()
module.exports = authCtrl