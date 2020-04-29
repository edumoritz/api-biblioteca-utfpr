
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome').notNullable()
        table.date('data_nascimento')
        table.integer('perfil')
        table.integer('ra').notNullable().unique()
        table.integer('matricula_siape').notNullable().unique()
        table.integer('situacao')
        table.string('password', 32).notNullable()
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
