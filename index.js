const http = require ('http');          //node server 
const app = require("./src/config/express.config");         //express application


const httpServer = http.createServer(app)     //param == server application


httpServer.listen(3005, '127.0.0.1' , (error) => {
    if(!error){
        console.log("Server is running on port: 3005");
        console.log("Press ctrl + c to disconnect the server");
    }
})