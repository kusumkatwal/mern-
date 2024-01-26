const adminSvc = require("./admin.service");

class AdminController {
   users =async (req, res, next) => {
        try{
            const query = req.query;
            let response;

            if(query.search) {
                console.log("iminfilter")
                const filter = {
                    role : new RegExp(query.search, "i")
                }
                 response = await adminSvc.getUserByFilter(filter)
                 console.log(response)
            }else {
                console.log("I am in not in filter")
                 response = await adminSvc.listAllUsers();
                 console.log(response)
            }
            res.json({
                result: response,
                message: "Users list fetched",
                meta: null
            })
        }catch (exception) {
            next(exception)
        }
    }

    update = async (req, res, next) => {
        try{
            const payload = req.body;
        const id = req.params.id;
        const userDetail = await adminSvc.getSingleUserByFilter({_id: id})
        // if(!payload.image){
        //     payload.image = userDetail.image;
        // }else {
        //     userDetail.image = req.file.filename;
        // }
        
        const success= await adminSvc.update(id, payload)
        if(success) {
            res.json({
                result: "",
                message: "User updated successfully",
                meta: null
            })
        }
        }catch(exception) {
            console.log(exception)
            next(exception)
        }
    }
    
}

const adminCtrl = new AdminController();
module.exports = adminCtrl;