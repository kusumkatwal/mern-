Auth
    ->Register                          //post=> /register
    ->Activation                        //get => /activate/:token
    -> password set                     //post => /set-password/:token
    -> Login                            //post => /login
    -> Forget Password                  //post => /forget-password
    -> Reset Passworn                   //post => /reset-password
    -> Logout
    -> Role based Access Control

User 
    ->USer create
    ->User List
    -> USer list based on filter
    -> user details based on id
    -> user update based on id
    -> user delete based on id

Task

Banner
>USer create
    ->User List
    -> USer list based on filter
    -> user details based on id
    -> user update based on id
    -> user delete based on id
in express everything is a middleware ---app.use- largest middleware
Route ===> Middleware
    ----response return
        res.json()

express middlware (3 params -req, res, next)
----executes between route and controller
--next is a callback function that immediately calls next middleware
--a middleware can manipulate a request
--a middleware can response as well

route ===> Middleware ---> Middleware ---> Middleware ---->Middleware ====>Controller

400 => Bad Request
401 => Unauthorized
403 => Access Denied
404 => Not found
422 => Unprocessable Entity

application level middleware
routing level middleware
error handling level middleware

controller -> controlling unit that validates the data or payload of frontend
