const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 2,
        required: true
    }, 
    slug : {
        type: String,
        unique: true,
        required: true
    },
    category : [{
        type: mongoose.Types.ObjectId,
        default: null,
        ref: "Category"
    }],
    description : {
        type: String,
        required : true
    },
    price: {
        type : Number,
        required: true,
        min : 50
    },
    discount : {
        type : Number,
        default: 0,
        min : 0,
        max: 90
    },
    afterDiscount : {
        type : Number,
      required: true  
    },
    brand : {
        type : mongoose.Types.ObjectId,
        ref : "Brand",
        default: null
    },
    seller : {
        type: mongoose.Types.ObjectId,
        ref : "Users",
        default: null
    },
    featured : {
        type : Boolean,
        default: false
    },
    attribute : [{
        name : String,
        value : [String]    
    }],
    status: {
        type: String,
        enum: ['active','inactive'],
        default: "inactive"
    },
    images: {
        type: String,
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },

},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true,

})

const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel