
exports.up = function(knex) {
    return knex.schema.createTable('usuario_telefone', table => {
        table.increments('id').primary()
        table.integer('id_usuario').unsigned().notNullable()
        table.string('telefone', 20)
        table.foreign('id_usuario').references('id').inTable('usuarios');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario_telefone');
};
