
exports.up = function(knex) {
  return knex.schema.createTable('users', builder => {
    builder.uuid('id').primary()

    builder.string('name', 40).notNullable()
    builder.string('login', 30).notNullable().unique()
    builder.string('email', 80).notNullable().unique()
    builder.string('password').notNullable()
    builder.datetime('last_login')
    builder.boolean('active').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
