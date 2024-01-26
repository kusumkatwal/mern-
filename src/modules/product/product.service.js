const ProductModel = require("./product.model");

class ProductService  {

    transformCreateRequest = (req, isEdit=false) => {
        const data = {
            ...req.body            
        }
        //!isEdit  is an edit operation 
        if(!isEdit && !req.files) {
            throw{code: 422, message: "Image is required", result: {image: "Image is required"}}
        } else {
            if(req.files) {
                data.image = req.files.map((item) => item.filename);
            }
        }

        if(data.category === "null" || data.category === ''){
            data.category = null; 
        }else {
            data.category = data.category.split(",")
        }

        data.afterDiscount = data.price - data.price * data.discount/100

        if(data.seller === "null" || data.seller === ''){
            data.seller = null; 
        }

        if(data.brand === "null" || data.brand === ''){
            data.brand = null; 
        }

        if(data.featured === "true" || data.featured === 1){
            data.featured = true; 
        }else {
            data.featured = false
        }

        if(data.attribute === "null" || data.attribute === ''){
            data.attribute = null; 
        }else {
            data.attribute = data.attribute.split(",")
        }

        if(!isEdit) {
            data.createdBy = req.authUser._id
        } else {
            data.updatedBy = req.authUser._id
        }
        return data;
    }

    createProduct =async (data) => {
        try{
            const product = new ProductModel(data)
            return await product.save()
        }catch(exception) {
            throw exception
        }
    }
     getcount = async(filter = {}) => {
        const count = await ProductModel.countDocuments(filter)
        return count
    }

    getAllCategories = async ({limit=10, skip=0, filter={}}) => {
        try{
            let data = await ProductModel.find(filter)
                .populate("createdBy", ["_id", "name", "role"])
                .populate("updatedBy", ["_id", "name", "role"])
                .sort({"_id": "desc"})
                .skip(skip)
                .limit(limit)
            return data
        }catch(exception)
        {
            next(exception)
        }
    }
    getOneByFilter = async(filter) => {
        try{
            const data = await ProductModel.findOne(filter)
                .populate("brand", ["_id", "title"])
                .populate("seller", ["_id", "name"])
                .populate("product", ["_id", "title"])
                .populate("createdBy", ["_id", "name", "role"])
                .populate("updatedBy", ["_id", "name", "role"])
            return data;
        }catch(exception) {
            throw exception
        }
    }

    updateProduct = async(id, data) => {
        try{
            let status = await ProductModel.findByIdAndUpdate(id, {
                $set: data
            })
            return status
        }catch(exception) {
            throw exception
        }
    }

    deleteById = async(id) => {
        try{
            let response = await ProductModel.findByIdAndDelete(id)
            if(!response){
                throw{code: 404, message: "Product doesnt exist or already delted."}
            }else {
                return response
            }
        }catch(exception)
        {
            throw(exception)
        }
    }
}

const productSvc = new ProductService()
module.exports = productSvc