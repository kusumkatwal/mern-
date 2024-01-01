const nodemailer = require('nodemailer');
const { randomString } = require('../../config/helper.config');
const EmailService = require('../common/email/email.service');

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
            //to do : db operation
            let dbStatus = true;
            if (dbStatus) {
                let link = "http://localhost:5173/activate/" + payload.activationToken
                let message = `Dear ${payload.name},<br/>
                            <p>Your account has been sucessfully registered. Please
                            click the url link given below. 
                            <a href = ${link}>${link} </a>
                            <br/>
                            Regards, <br/>
                            System Admin <br/>
                            <small> Please don't respond to this email. </small>
                            </p>
                            
                `

                await (new EmailService()).sendEmail(payload.email, "Activate your account", message)
            }

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
            })


        }

    }
    verify = (req, res, next) => {
        let id = req.params.token;
        let data = [
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
    }
    activation = async (req, res, next) => {
        try {
            const sucess = true;
            if(sucess) 
            {
                let user = {
                    name: "Kusum Katwal",
                    email:"kusum742gmail.com",
                    status : 'activated',
                }
                
                //DB store: mongodb
                //to do : db operation
                let dbStatus = true;
                if (dbStatus) {
                    let email = "kusum74@gmail.com";
                    let message = `Dear ${user.name},<br/>
                                <p>Your account has been activated.
                                <br/>
                                Regards, <br/>
                                System Admin <br/>
                                <small> Please don't respond to this email. </small>
                                </p>
                                
                    `
                await (new EmailService()).sendEmail(email, "Account Activated", message)
                }
                res.json({
                    result: req.body,
                    message: "Password mounted",
                    meta: null
                })
    
            }
            else {
                throw {code: 422, message: "Cannot activated at this moment."}
            }

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