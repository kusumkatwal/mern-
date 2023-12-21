using node js to set up backend server
---communication between client and server
    API Development 
        ->Application Programming Interface 

--http package - global package so no need to set up

API 
-> endpoints/Url 
    method, url, payload, header config 

    protocol://endpoint/path?querystring

    endpoint => domaninName.tld (topleverdomain):portnumber

    protocol - set of ruless that is used to communicate between client and sever

    http, https, smtp, ftp, ssh, telnet, sftp, mysql(server + protocol), mongodb(server + protocol), pop3, imap, 

    http =====> port no 80
    https =====> 443,,
    smtp, imap, pop3 ===> 25,2525, 485, 587
    telnet, ssh, sftp ====> 22,
    ftp ====> 21,
    mysql ===> 3306,
    mongodb ===> 27017,
    postgres ====> 5432
0 - (2^16)


3000/9000 -> reserved for node ad free

express js - node js server side framework
MVC architecture : 
        Routes 
        ---Middleware
        -----Controller
        --------View or service or model

API: 

-REST 
-- Representational stateless Transfer 
-- There will be no any state maintained by server
-- Works on the basis of token
-- Methods used by REST ==> get, post, put, patch, delete
-- CRUD operation 


(nodemon - automatically restarts the node application when any change is detected.)
Postman / insomnia 
-SOAP

(git pull origin --force)
-user,banner, brand, categorym product
src
    /config     -all the configurations
    /routes
    /module
        /auth       -user authorization
        /banner
        /brand
        .category
        /user
        /product
        /order
        /blog
        /pages
        /offfers
        /transactions
    /utility            -additional features
    /sevices            -email services etc
