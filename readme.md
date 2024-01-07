# apidmg,,f
merge

next() calls another middleware
next can only have exception parameter.
conflict created



Registration 

Data ==> Validate ==> Mapping ==> Store(database)
Database ==> Choose

--------------------MongoDB----------------------

host => localhost/127.0.0.1
protocol => mongodb
user => null
password => null
port => 27017
dbName => 
url => mongodb://user:password@127.0.0.1:27017/dbName

=====> Switch db from shell 
    --> use <dbname>
=====> show databases 
    --> show dbs; 
=====> Current DB (active db) 
    -->db; 
=====> To list all the tables in current DB 
    -->show tables; 


CRUD 
# Create 
    ->Data, table
    _id auto append  => Primary Key (unique)

        *Insert one 

db.users.insertOne({})          --object
db.users.insertMany([{}])       --array of objects

# Read
    *Read Data
        ->db.<collectionName>.findOne(filter, projection)
        ->db.<collectionName>.find(filter, projection)

        **filter
            -> is an object data 
            {
                $operationName: expression
            }
             0r{
                key : [{$operation: express}]
             }
        
        //Not equals
        {key : {$ne: value}}
        //Equals
            {key: value}
        //And Operation 
            {key : value, key1: value}
            or{
                $and: [
                    {key:value},
                    {$operation : exp}
                ]
            }

        /OR operation 
        {
            $or: [
                {}
            ]
        }

        //$gt, $gte, $lt, $lte

        Projection: 
        to select specific columns 

# Update
    ->db.<collectionName>.updateOne(filter, updateBody, config)
    ->db.<collectionName>.updateMany(filter, updateBody, config)

        filter ==> id based filter
        {id: ObjectId('idString')}

# Delete

        ->db.<collectionName>.deleteOne()

# ORM / ODM 

    Documetn Based
    core ==>ODM Providers ==> Mongoose

    tables ==> collections
    Row/Column ==> Document keys (Json format)

    SQL Servers 
        -ts ---> typeorm, sequelize, prisma
        -js ---> sequelize, prisma