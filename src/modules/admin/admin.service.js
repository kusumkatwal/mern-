const UserModel = require('../user/user.model')
class UserService {

    listAllUsers = async () => {
       try{
        const response = await UserModel.find();
        return response;
       }catch(exception) {
        throw{code: 422, message: "empty database"}
       }

    }

    getUserByFilter = async (filter) => {
        try{
            const response = await UserModel.find(filter)
        return response;
        }catch(Exception) 
        {
            throw {code: 422, message: "User not found"}
        }
    }

    getSingleUserByFilter = async (filter) => {
        try{
            const response = await UserModel.findOne(filter)
            return response
        }catch(exception){
            throw {code: 422, message: "USer not found"}
        }
    }

    update = async (id, data) => {
        try{
            const response = await UserModel.findByIdAndUpdate(id , {$set : data})
            return response;
        }catch(exception){
            console.log(exception)
            throw{code: 422, message : "error while updating"}
        }
    }


}

const userSvc = new UserService();
module.exports = userSvc;