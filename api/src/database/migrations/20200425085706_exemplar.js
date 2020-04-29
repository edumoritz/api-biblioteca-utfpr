exports.up = function(knex) {
    return knex.schema.createTable('exemplar', table => {
        table.increments('id').primary()
        table.integer('id_obra').unsigned().notNullable()
        table.integer('situacao')
        table.date('data_aquisicao')
        table.foreign('id_obra').references('id').inTable('obra');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('exemplar');
};
