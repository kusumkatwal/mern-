const nodemailer = require('nodemailer');

class EmailService {
    transporter;
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port : 587,
            auth: {
                user: "63e9e543fd5ebc",
                pass: "5c4393edeed6a7"
            }
        })
    }

     sendEmail = async (to, sub, message) => {
        try{
            await this.transporter.sendMail({
                to: to,
                from: "no-reply@gmail.com",
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