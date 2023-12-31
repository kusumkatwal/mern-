const multer = require('multer');
const fs = require("fs");
const { randomString } = require('../config/helper.config');


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./public/uploads"
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive: true
            })
        }
        cb(null,path);
    },
    filename: (req,file, cb) => {
        const ext = (file.orignalname.split(".")).pop()
        const fileName = randomString(30)+""+"."+ext
        cb(null, fileName)
    }
 })

const imagefilter = (req, file, cb) => {
    const ext = (file.originalname.split(".")).pop()
        if(['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp', 'bmp'])
           { cb(null, true)}
           else {
            cb({code: 422, 
            message: "File format is not supported"})
           }
}
const uploader = multer ({
    storage: myStorage,
    fileFilter: imagefilter,
    limits: {
        fileSize: 5000000
    }
})

module.exports = uploader;