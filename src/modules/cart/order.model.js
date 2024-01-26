const { number } = require("joi")
const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    cartId: [{
        type: mongoose.Types.ObjectId,
        ref: "Cart",
        require: true
    }],
    subTotal: {
        type: Number,
        min: 0,
        require: true
    }, discount: {
        type: Number,
        min: 0,
        default: 0
    },
    serviceCharge: {
        type: Number,
        min: 0,
        default: 0
    },
    taxAmt: {
        type: Number,
        min: 0,
        default: 0
    },
    totalAmt: {
        type: Number
    },
    status : {
        type: string,
        enum: ['new', 'verify', 'processing', 'cancelled', 'completed'],
        default: 'new'
    }

}, {
    autoCreate: true,
    autoIndex: true
})