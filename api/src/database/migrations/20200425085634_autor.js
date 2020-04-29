exports.up = function(knex) {
    return knex.schema.createTable('autor', table => {
        table.increments('id').primary()
        table.string('nome', 100)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('autor');
};