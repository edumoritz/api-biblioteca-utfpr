const connection = require('../database/connection');

module.exports = {
    async setAdmin (req, res) {

        const users = await connection('usuarios').select('*').first();
        if(!users) {
            let userID = await connection('usuarios').insert({
                nome: "admin",
                perfil: 0,
                ra: 0000,
                matricula_siape: 0000,
                situacao: 0,
                password: "admin"               
            })
            await connection('usuario_telefone').insert({
                id_usuario: userID,
                telefone: "5599999-9999"
            })
            await connection('usuario_endereco').insert({
                id_usuario: userID,
                cep: 85889280,
                rua: "Rua do ADMIN",
                municipio: "Cascavel",
                uf: "PR",
                complemento: "Casa"
            }) 
            res.status(200).json(userID) 
        }
        res.status(200).json(users) 
    } 
}
/**
 * Perfil:
 * Adm = 0
 * usuario = 1
 * 
 * Situacao:
 * Ativo = 0
 * Inativo = 1
 */