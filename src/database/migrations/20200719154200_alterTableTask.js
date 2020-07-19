
exports.up = function(knex) {
  return knex.schema.alterTable('tasks', builder => {
    builder.uuid('user_id').notNullable()
    builder.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('tasks', builder => {
    builder.dropForeign('user_id')
    builder.dropColumn('user_id')
  })
};
