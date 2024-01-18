const brandSvc = require("./brand.service");

class BrandController {
    
    createBrand = async (req, res, next) => {
        try{
            const data = brandSvc.transformCreateRequest(req);
            const success = await brandSvc.createBrand(data)
            res.json({
                result: success,
                message: "Brand stored successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    listAllBrands = async (req, res, next) => {
        try{
            const query = req.query;
            let limit = +query.limit || 10
            let page = +query.page || 1
            let skip = 0;
            if(page>1) {
                skip = (page - 1) * limit
            }
            let filter = {};
            if(query.search) {
                filter = {
                    title: new RegExp(query.search, 'i')
                }
            }
           const count = await brandSvc.getcount(filter);
            const data = await brandSvc.getAllBrands ({
                limit : limit,
                skip: skip,
                filter: filter
            })
            res.json({
                result: data,
                message: "Brand fetched",
                meta: {
                    currentPage: page,
                    total: count,
                    limit: limit
                }
            })
        }catch(exception) {
            console.log(exception)
            next(exception)
        }
    }

    getBrandDetail = async(req, res, next) => {
        try{
            const data = await brandSvc.getOneByFilter({_id: req.params.id})
            if(!data) {
                throw{ code: 404, message: "Brand does not exists"}
            }else {
                res.json({
                    result: data,
                    message: "Brand detail fetched",
                    meta: null
                })
            }
        }catch(exception) {
            next(exception)
        }
    }

    updateById = async (req, res, next) => {
        try{
            const brandDetail = await brandSvc.getOneByFilter({_id: req.params.id});
            if(!brandDetail) {
                throw{code: 404,  message: "Message not found"}
            }
            const data = brandSvc.transformCreateRequest(req, true);

            if(!data.image) {
                data.image = brandDetail.image
            }
            const success = await brandSvc.updateBrand(req.params.id, data)
            if(!success){
                throw {code: 400, message: "Problem while updating Brand"}
            }
            res.json({
                result: success,
                message: "Brand updated successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    deleteById = async (req, res, next) => {
        try{
            let response = await brandSvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "Brand Deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    loginHome = async (req, res, next) => {
        try{
            const data = await BrandModel.getAllBrands({
                limit:10,
                skip: 0,
                filter: {
                    status: 'active'
                }
            })
            if(!data || data.length <= 0){
                throw {code: 400, message: "Empty Brand list"}
            }
            res.json({
                result: data,
                message: "Brand detail fetched",
                meta: null
            })
        }catch(exception) {
            next(exception)
        }
    }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;