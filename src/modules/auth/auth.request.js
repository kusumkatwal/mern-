const Joi = require("joi")

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().empty(),
    phone: Joi.string(),
    role: Joi.string().pattern(/^(customer|seller|admin)$/)

    
})

const activationToken = Joi.object({
    token: Joi.string().length(100).required()
})

const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(25).required(),
    confirm_password: Joi.ref("password")
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
})

const forget_password_schema = Joi.object ({
    user: Joi.string().required(),
    email: Joi.string().email().required()
})
module.exports = {
    registerSchema, activationToken, passwordSchema, loginSchema, forget_password_schema
}