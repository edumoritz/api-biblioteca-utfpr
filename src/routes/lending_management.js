const connection = require('../database/connection');

module.exports = {
    async findMain (req, res) {
        if(!req.headers.authorization) res.status(400).json("Não existe Usuário logado");  
        const lendings = await connection('emprestimo')
            .join('usuarios', 'usuarios.id', '=', 'emprestimo.id_usuario')
            .join('exemplar', 'exemplar.id', '=', 'emprestimo.id_exemplar')
            .join('obra', 'obra.id', '=', 'exemplar.id_obra')
            .join('autor', 'autor.id', '=', 'obra.id_autor')
            .select([
                'emprestimo.id as id_emprestimo',
                'obra.titulo',
                'emprestimo.data_emprestimo',
                'emprestimo.data_devolucao'     
            ]).where('usuarios.id', req.headers.authorization);
        res.status(200).json(lendings);   
    },
    async findBook (req, res) {
        const { id } =  req.params;
        const devolution = await connection('emprestimo')
            .join('usuarios', 'usuarios.id', '=', 'emprestimo.id_usuario')
            .join('exemplar', 'exemplar.id', '=', 'emprestimo.id_exemplar')
            .join('obra', 'obra.id', '=', 'exemplar.id_obra')
            .join('autor', 'autor.id', '=', 'obra.id_autor')
            .select([
                'usuarios.ra',
                'emprestimo.data_emprestimo',
                'emprestimo.data_prevista_devolucao',
                'emprestimo.data_devolucao'                
            ]).where('emprestimo.id', '=', id);
        res.status(200).json(devolution);   
    },
    async create (req, res)  {
        var { codigo_exemplar, user_ra, data_prevista_devolucao } = req.body;

        const exempId = await connection('exemplar').select('exemplar.id')
            .where('id', '=', codigo_exemplar).first();
        if(!exempId) res.status(400).json("Exemplar inexistente!");

        const ex_situacao = await connection('exemplar').select('exemplar.id')
            .where('exemplar.id', '=', codigo_exemplar).andWhere('situacao', '=', 1).first();
        if(!ex_situacao) res.status(400).json("Exemplar indisponível ou já emprestado.");


        const userId = await connection('usuarios').select('usuarios.id')
            .where('ra', '=', user_ra).first();
        if(!userId) res.status(400).json("RA não encontrado.");        

        await connection('emprestimo').insert({ 
            id_exemplar: exempId.id,
            id_usuario: userId.id,
            data_prevista_devolucao: new Date(data_prevista_devolucao),
            data_emprestimo: new Date()
        })  
        
        await connection('exemplar').update({
            situacao: 2
        }).where('id', exempId.id);

        res.status(201).json(req.body);
    }
}