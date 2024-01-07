const mongoose = require('mongoose')

const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    activationToken: String,
    role: {
        type: String,
        enum: ["admin", "seller", "customer"],
        default:"customer"
    },
    forgetPasswordToken: String,
    address: {
        shipping: String,
        billing: String
    },
    status: {
        type: String,
        enum: ["activated", "notactivated", "suspended","deleted"],
        default: "notactivated"
    },
    dataOfBirth : Date

},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", USerSchemaDef)
module.exports = UserModel