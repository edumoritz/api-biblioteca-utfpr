const connection = require('../database/connection');
const validAdmin = require('../utils/valid_admin');

module.exports = {
    async findAll (req, res) {
        const users = await connection('usuarios')
            .join('usuario_endereco', 'usuario_endereco.id_usuario', '=', 'usuarios.id')
            .join('usuario_telefone', 'usuario_telefone.id_usuario', '=', 'usuarios.id')
            .select([
                'usuarios.ra',
                'usuarios.nome',
                'usuarios.data_nascimento'
            ]);
        res.status(200).json(users);   
    },
    
    async create (req, res)  {
        var { 
            nome, data_nascimento, perfil, ra, matricula_siape, situacao, password,
            cep, rua, municipio, uf, complemento, telefone
        } = req.body;

        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");    
     
        await connection('usuarios').insert({
            nome,
            data_nascimento: new Date(data_nascimento),
            perfil,
            ra,
            matricula_siape,
            situacao,
            password
        })
        var idUser = await connection('usuarios').select('usuarios.id').where('ra', '=', ra).first();        

        await connection('usuario_telefone').insert({
            id_usuario: idUser.id,
            telefone
        })

        await connection('usuario_endereco').insert({
            id_usuario: idUser.id,
            cep,
            rua,
            municipio,
            uf,
            complemento
        })        
            
        res.status(201).json(req.body);    
    },
    async change (req, res) {
        var { 
            nome, data_nascimento, perfil, matricula_siape, situacao, password,
            cep, rua, municipio, uf, ra, complemento, telefone
        } = req.body;
        var { id } = req.params;

        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");

        await connection('usuarios').update({
            nome,
            data_nascimento: new Date(data_nascimento),
            perfil,
            ra,
            matricula_siape,
            situacao,
            password
        }).where('id', id);

        await connection('usuario_telefone').update({
            telefone
        }).where('id_usuario', '=', id);

        await connection('usuario_endereco').update({
            cep,
            rua,
            municipio,
            uf,
            complemento
        }).where('id_usuario', '=', id);  
      
        res.status(201).json(req.body);

    },
    async delete (req, res) {
        if(!req.headers.authorization) res.status(401).json("Não existe usuario logado.");
        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");

        const { id } = req.params;
        await connection('usuario_telefone').where('id_usuario', id).delete();
        await connection('usuario_endereco').where('id_usuario', id).delete();
        await connection('usuarios').where('id', id).delete();

        res.status(200).json("Usuário deletado");
    }
}
