
exports.up = function(knex) {
  return knex.schema.alterTable('tasks', builder => {
    builder.datetime('done_date').alter()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('tasks', builder => {
    builder.date('done_date').alter()
  })
};
