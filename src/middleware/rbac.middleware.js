const PermissionCheck = (role) => {
    return (req, res, next) => {
        try{ 
            let authUser = req.authUser; 
            
            if(authUser.role 
                &&
                (
                    (typeof role === 'string' && authUser.role ===role) ||
                    (Array.isArray(role) && role.includes(authUser.role))
                )) {
                next();
            }else{
                next({code:403,
                    message: "You dont have permission to access"
                })
            }
        }catch(exception) {
            next(exception)
        }
    }
}

module.exports = PermissionCheck