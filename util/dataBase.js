const mongodb = require('mongodb');
const MongoClient= mongodb.MongoClient;
let _db;

const mongoConnect = callback=>{
    MongoClient.connect('mongodb+srv://dieko:36tZQfZZZUoAFiGw@diegogrupo.lu9lnoy.mongodb.net/?retryWrites=true&w=majority')
    .then(client =>{
    console.log('Connected!');
    _db=client.db();
    callback();
    }).catch(err =>{
    console.log(err);
    throw err;
    });
};
const getDb= ()=>{
    if(_db){
        return _db;
    }
    throw 'no se encuentra la base de datos';
}

exports.mongoConnect = mongoConnect;
exports.getDb= getDb;
