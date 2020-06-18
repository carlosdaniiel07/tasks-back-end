
exports.up = function(knex) {
  return knex.schema.createTable('tasks', builder => {
    builder.uuid('id').primary(),

    builder.string('description', 200).notNullable()
    builder.date('estimate_date')
    builder.date('done_date')
    builder.boolean('notify')

    builder.datetime('created_at').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
};
