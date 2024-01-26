const categorySvc = require("./category.service");

class CategoryController {
    
    createCategory = async (req, res, next) => {
        try{
            const data = categorySvc.transformCreateRequest(req);
            const success = await categorySvc.createCategory(data)
            res.json({
                result: success,
                message: "Category stored successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    listAllCategories = async (req, res, next) => {
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
           const count = await categorySvc.getcount(filter);
            const data = await categorySvc.getAllCategories ({
                limit : limit,
                skip: skip,
                filter: filter
            })
            res.json({
                result: data,
                message: "Category fetched",
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

    getCategoryDetail = async(req, res, next) => {
        try{
            const data = await categorySvc.getOneByFilter({_id: req.params.id})
            if(!data) {
                throw{ code: 404, message: "Category does not exists"}
            }else {
                res.json({
                    result: data,
                    message: "Category detail fetched",
                    meta: null
                })
            }
        }catch(exception) {
            next(exception)
        }
    }

    updateById = async (req, res, next) => {
        try{
            const categoryDetail = await categorySvc.getOneByFilter({_id: req.params.id});
            if(!categoryDetail) {
                throw{code: 404,  message: "Message not found"}
            }
            const data = categorySvc.transformCreateRequest(req, true);

            if(!data.image) {
                data.image = categoryDetail.image
            }
            const success = await categorySvc.updateCategory(req.params.id, data)
            if(!success){
                throw {code: 400, message: "Problem while updating Category"}
            }
            res.json({
                result: success,
                message: "Category updated successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    deleteById = async (req, res, next) => {
        try{
            let response = await categorySvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "Category Deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    loginHome = async (req, res, next) => {
        try{
            const data = await CategoryModel.getAllCategories({
                limit:10,
                skip: 0,
                filter: {
                    status: 'active'
                }
            })
            if(!data || data.length <= 0){
                throw {code: 400, message: "Empty Category list"}
            }
            res.json({
                result: data,
                message: "Category detail fetched",
                meta: null
            })
        }catch(exception) {
            next(exception)
        }
    }
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;