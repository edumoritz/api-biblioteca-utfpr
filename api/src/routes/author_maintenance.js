const connection = require('../database/connection');
const validAdmin = require('../utils/valid_admin');

module.exports = {
    async findAll (req, res) {
        const author = await connection('autor').select('*');
        res.status(200).json(author);   
    },
    async create (req, res)  {
        var { nome } = req.body;

        if(!await validAdmin(req.headers.authorization)) 
            res.status(401).json("Você não é administrador ");
       
            
        await connection('autor').insert({ nome })     
        res.status(201).json(req.body);
        
    }
}