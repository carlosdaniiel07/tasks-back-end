
exports.up = function(knex) {
  return knex.schema.alterTable('tasks', builder => {
    builder.datetime('estimate_date').alter()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('tasks', builder => {
    builder.date('estimate_date').alter()
  })
};
