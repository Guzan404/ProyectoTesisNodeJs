const getDb = require('../util/dataBase').getDb;
class {
    constructor(idUsuarios,nombre,correo,contraseña, rol){
        this.idUsuarios =idUsuarios;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.rol=rol;
    }
    save(){
        const db = getDb();
        return db.collection('tbl_usuarios')
        .insertOne(this)
        .then(result =>{
            console.log(result);
        }).catch(err =>{
            console.log(err);
        });
    }
    static fetchAll(){
        const db = getDb();
        return db.collection('tbl_usuarios').find().toArray()
        .then(Users =>{
            console.log(Users);
            return Users;
        })
        .catch(err =>{
            console.log(err);
        });
    }
}

module.exports = User;