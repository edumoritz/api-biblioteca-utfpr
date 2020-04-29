exports.up = function(knex) {
    return knex.schema.createTable('obra', table => {
        table.increments('id').primary()
        table.integer('id_autor').unsigned().notNullable()
        table.string('titulo', 100)
        table.integer('ano')
        table.string('tipo')
        table.foreign('id_autor').references('id').inTable('autor');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('obra');
};
