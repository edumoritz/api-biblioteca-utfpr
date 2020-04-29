
exports.up = function(knex) {
    return knex.schema.createTable('usuario_endereco', table => {
        table.increments('id').primary()
        table.integer('id_usuario').unsigned().notNullable()
        table.integer('cep')
        table.string('rua', 120)
        table.string('municipio', 120)
        table.string('uf', 2)
        table.string('complemento')
        table.foreign('id_usuario').references('id').inTable('usuarios')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario_endereco');
};
