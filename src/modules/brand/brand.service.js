const BrandModel = require("./brand.model");

class BrandService  {

    transformCreateRequest = (req, isEdit=false) => {
        const data = {
            ...req.body            
        }
        //!isEdit  is an edit operation 
        if(!isEdit && !req.file) {
            throw{code: 422, message: "Image is required", result: {image: "Image is required"}}
        } else {
            if(req.file) {
                data.image = req.file.filename;
            }
        }

        if(!isEdit) {
            data.createdBy = req.authUser._id
        } else {
            data.updatedBy = req.authUser._id
        }
        return data;
    }

    createBrand =async (data) => {
        try{
            const brand = new BrandModel(data)
            return await brand.save()
        }catch(exception) {
            throw exception
        }
    }
     getcount = async(filter = {}) => {
        const count = await BrandModel.countDocuments(filter)
        return count
    }

    getAllBrands = async ({limit=10, skip=0, filter={}}) => {
        try{
            let data = await BrandModel.find(filter)
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
            const data = await BrandModel.findOne(filter)
                .populate("createdBy", ["_id", "name", "role"])
                .populate("updatedBy", ["_id", "name", "role"])
            return data;
        }catch(exception) {
            throw exception
        }
    }

    updateBrand = async(id, data) => {
        try{
            let status = await BrandModel.findByIdAndUpdate(id, {
                $set: data
            })
            return status
        }catch(exception) {
            throw exception
        }
    }

    deleteById = async(id) => {
        try{
            let response = await BrandModel.findByIdAndDelete(id)
            if(!response){
                throw{code: 404, message: "Brand doesnt exist or already delted."}
            }else {
                return response
            }
        }catch(exception)
        {
            throw(exception)
        }
    }
}

const brandSvc = new BrandService()
module.exports = brandSvc