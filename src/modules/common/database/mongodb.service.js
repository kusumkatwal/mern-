const {MongoClient} =require('mongodb');
class MongodbClass {
    db;
    constructor() {
        try{
          this.connect();  
        }catch(exception){
            console.log(exception)
            throw exception
        }
    }

    connect = async() => {
        try{
            const client = await MongoClient.connect("mongodb://127.0.0.1:27017")
            this.db = client.db('mern');
        }catch(exception){
            throw exception
        }
    }
}
module.exports = MongodbClass;