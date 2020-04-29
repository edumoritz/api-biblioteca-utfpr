const connection = require('../database/connection');

module.exports = {    
    async change(req, res) {
        var { codigo_emprestimo, user_ra, data_devolucao } = req.body;

        const empId = await connection('emprestimo')
            .join('usuarios', 'usuarios.id', '=', 'emprestimo.id_usuario')
            .join('exemplar', 'exemplar.id', '=', 'emprestimo.id_exemplar')
            .select([
                'emprestimo.id as id_emprestimo',
                'usuarios.id as id_usuario',
                'exemplar.id as id_exemplar'
            ]).where('emprestimo.id', '=', codigo_emprestimo)
            .andWhere('usuarios.ra', '=', user_ra).first()

        if (!empId) res.status(400).json("Este emprestimo é inexistente!");


        await connection('emprestimo').update({
            data_devolucao: new Date(data_devolucao)
        }).where('id', empId.id_emprestimo);


        /**
        * Realiza update da situação na tabela exemplar
        * @param situacao = 1 disponivel
        * 0 - Inativo
        * 1 - disponivel
        * 2 - emprestado
        */
        await connection('exemplar').update({
            situacao: 1
        }).where('id', empId.id_exemplar);

        res.status(201).json(empId);
    }
}