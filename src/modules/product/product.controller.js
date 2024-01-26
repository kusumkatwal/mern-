const productSvc = require("./product.service");

class ProductController {
    
    createProduct = async (req, res, next) => {
        try{
            const data = productSvc.transformCreateRequest(req);
            const success = await productSvc.createProduct(data)
            res.json({
                result: success,
                message: "Product stored successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    listAllProducts = async (req, res, next) => {
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
           const count = await productSvc.getcount(filter);
            const data = await productSvc.getAllProducts ({
                limit : limit,
                skip: skip,
                filter: filter
            })
            res.json({
                result: data,
                message: "Product fetched",
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

    getProductDetail = async(req, res, next) => {
        try{
            const data = await productSvc.getOneByFilter({_id: req.params.id})
            if(!data) {
                throw{ code: 404, message: "Product does not exists"}
            }else {
                res.json({
                    result: data,
                    message: "Product detail fetched",
                    meta: null
                })
            }
        }catch(exception) {
            next(exception)
        }
    }

    updateById = async (req, res, next) => {
        try{
            const productDetail = await productSvc.getOneByFilter({_id: req.params.id});
            if(!productDetail) {
                throw{code: 404,  message: "Message not found"}
            }
            const data = productSvc.transformCreateRequest(req, true);

            if(!data.image) {
                data.image = productDetail.image
            }
            const success = await productSvc.updateProduct(req.params.id, data)
            if(!success){
                throw {code: 400, message: "Problem while updating Product"}
            }
            res.json({
                result: success,
                message: "Product updated successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    deleteById = async (req, res, next) => {
        try{
            let response = await productSvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "Product Deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    loginHome = async (req, res, next) => {
        try{
            const data = await ProductModel.getAllCategories({
                limit:10,
                skip: 0,
                filter: {
                    status: 'active'
                }
            })
            if(!data || data.length <= 0){
                throw {code: 400, message: "Empty Product list"}
            }
            res.json({
                result: data,
                message: "Product detail fetched",
                meta: null
            })
        }catch(exception) {
            next(exception)
        }
    }
}

const productCtrl = new ProductController();
module.exports = productCtrl;