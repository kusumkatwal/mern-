const validator = (schema) => {
    return async (req, res, next) =>{
        try{
            let payload = req.body;
            await schema.validateAsync(payload);
            next();

        }catch(exception) {
            next({
                code: 422,
                message: exception.message,
                result: null
            })

        }
    }
}

const paramValidator = (schema) => {
   return async (req, res, next) =>{
        try{
            let payload = req.params;
            await schema.validateAsync(payload);
            next();

        }catch(exception) {
            next({
                code: 422,
                message: exception.message,
                result: null
            })

        }
    } 
}

const passwordValidator = (schema) => {
    return async (req, res, next) =>{
         try{
             let payload = req.body;
             await schema.validateAsync(payload);
             next();
 
         }catch(exception) {
            console.log(exception);
             next({
                 code: 422,
                 message: exception.message,
                 result: null
             })
 
         }
     } 
 }

 const loginValidator = (schema) => {
    return async (req, res, next) => {
        try{
            let payload = req.body;
            await schema.validateAsync(payload);
            next();
        }
        catch(exception){
            next({
                code:422,
                message: exception.message,
                result: null
            })
        }
    }
 }

 const forget_password_validator = (schema) => {
    return async (req, res, next) => {
        try{
            const payload = req.body;
        await schema.validateAsync(payload);
        next();
        }catch(exception) {
            next({
                code: 422,
                messgae: exception.message,
                result: null
            })
        }
    }
 }

module.exports = {validator, paramValidator, passwordValidator, loginValidator, forget_password_validator};