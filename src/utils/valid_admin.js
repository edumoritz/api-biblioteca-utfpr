const connection = require('../database/connection');

module.exports = async function validAdmin(auth) {

    const admin = await connection('usuarios').select('usuarios.id')
        .where('id', '=', auth).andWhere('perfil', '=', 0).first()

    if(!admin) {
        return false;
    } else {
        return true;
    }  
}