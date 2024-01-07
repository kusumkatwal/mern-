require("dotenv").config()
const nodemailer = require('nodemailer');

class EmailService {
    transporter;
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER_NAME,
                pass: process.env.SMTP_PWD
            }
        })
    }

     sendEmail = async (to, sub, message) => {
        try{
            await this.transporter.sendMail({
                to: to,
                from: process.env.FROM_ADDRESS,
                subject: sub,
                html: message
            })
        } catch(exception) {
            console.log("SendEmail : ", exception)
            throw exception;
        }
    }
}

module.exports = EmailService;