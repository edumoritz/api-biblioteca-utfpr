exports.up = function(knex) {
    return knex.schema.createTable('emprestimo', table => {
        table.increments('id').primary()
        table.integer('id_exemplar').unsigned().notNullable()
        table.integer('id_usuario').unsigned().notNullable()
        table.date('data_emprestimo')
        table.date('data_prevista_devolucao')
        table.date('data_devolucao')
        table.foreign('id_exemplar').references('id').inTable('exemplar');
        table.foreign('id_usuario').references('id').inTable('usuarios');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('emprestimo');
};