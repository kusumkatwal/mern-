const MongodbClass = require('../common/database/mongodb.service')
const EmailService = require('../common/email/email.service');

class AuthService extends MongodbClass {
    // constructor(), connect() , db

    registerUser = async (data) => {
        try{ 
            
            const response = await this.db.collection("users").insertOne(data); 
           
                let link = "http://localhost:5173/activate/" + data.activationToken
                let message = `Dear ${data.name},<br/>
                            <p>Your account has been sucessfully registered. Please
                            click the url link given below. 
                            <a href = ${link}>${link} </a>
                            <br/>
                            Regards, <br/>
                            System Admin <br/>
                            <small> Please don't respond to this email. </small>
                            </p>`

                await (new EmailService()).sendEmail(data.email, "Activate your account", message)
            
        }catch(exception) {
            throw exception
        }
    }
}

const authSvc = new AuthService();
module.exports = authSvc;
