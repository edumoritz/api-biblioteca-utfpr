const connection = require('../database/connection');
const validAdmin = require('../utils/valid_admin');

module.exports = {
    async findAll (req, res) {
        const users = await connection('obra')
            .join('autor', 'autor.id', '=', 'obra.id_autor')
            .join('exemplar', 'exemplar.id_obra', '=', 'obra.id')
            .select([
                'autor.*',
                'obra.*',
                'exemplar.*'
            ]);
        res.status(200).json(users);   
    },
    
    async create (req, res)  {
        var { 
            autor, titulo, ano, tipo,
            situacao, data_aquisicao
        } = req.body;

        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");
  
        
        var idAuthor = await connection('autor').select('autor.id')
            .where('id', '=', autor).first(); 
        
        if(!idAuthor) res.status(400).json("Autor não identificado na base de dados.");      
        
        var idObra = await connection('obra').insert({
            id_autor: idAuthor.id,
            titulo,
            ano,
            tipo
        })
        
        await connection('exemplar').insert({
            id_obra: idObra,
            situacao,
            data_aquisicao: new Date(data_aquisicao)
        })        

        res.status(201).json(req.body);        

    },
    async change (req, res) {
        var { 
            autor, titulo, ano, tipo,
            situacao, data_aquisicao
        } = req.body;
        var { id } = req.params;

        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");

        await connection('obra').update({
            titulo,
            ano,
            tipo
        }).where('id', id);
        await connection('exemplar').update({
            situacao,
            data_aquisicao: new Date(data_aquisicao)
        }).where('id_obra', id);
        
        res.status(200).json("Obra alterada!");
        

    },
    async delete (req, res) {
        const { id } = req.params;

        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");
        await connection('exemplar').where('id_obra', id).delete();
        await connection('obra').where('id', id).delete();

        res.status(200).json("Obra deletada!");
    }
}
