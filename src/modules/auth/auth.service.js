const { randomString } = require('../../config/helper.config');
const MongodbClass = require('../common/database/mongodb.service')
const EmailService = require('../common/email/email.service');
const UserModel = require('../user/user.model')
class AuthService {
    // constructor(), connect() , db

    registerUser = async (data) => {
        try {
            const user = new UserModel(data);
            const response = await user.save()
            // const response = await this.db.collection("users").insertOne(data); 

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
            return response
        } catch (exception) {
            throw exception
        }
    }

    getUserByActivationToken = async (token) => {
        try {
            let data = await UserModel.findOne({
                activationToken: token
            })
            if (!data) {
                throw {
                    code: 400,
                    message: "Token does not exists"
                }
            }
            return data;
        } catch (exception) {
            throw exception
        }
    }

    updateUserById = async (id, data) => {
        try {
            const response = await UserModel.findByIdAndUpdate(id, { $set: data })
            // const response = await UserModel.findOneAndUpdate{_id: id},{$serL data}

            return response;
        } catch (exception) {
            throw exception;
        }
    }

    getUserByFilter = async (filter) => {
        try {
            const respones = await UserModel.findOne(filter)
            return respones;
        } catch (exception) {
            throw exception
        }
    }
    sendForgetPasswordMail = async (user) => {
        try {
            const forgetToken = randomString()
            let status = await UserModel.findOneAndUpdate({
                email: user.email
            }, {
                $set: {
                    forgetPasswordToken: forgetToken,
                }
            })


            let link = "http://reset-password//" + forgetToken;
            let message = `<p> Dear ${user.name},
                                 <br/>
                               Please click this link below to forget your password. 
                               <a href = "${link}">${link} </a> <br/>
                               Regards, <br/>
                               System Admin <br/>
                               <small>Please don't reply to this email.</small> `;

            (new EmailService()).sendEmail(user.email, "Reset your password", message)

            return status;

        } catch (exception) {
            throw exception
        }
    }
}

const authSvc = new AuthService();
module.exports = authSvc;
