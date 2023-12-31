const verify = (params) => {
    console.log(params)
    return async (req, res, next) => {
        try {
            let id = params;
            if(id == " "){
                res.json({

                })
            }


        }catch(exception){}
    }
}

module.exports = verify;