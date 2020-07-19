
exports.up = function(knex) {
  return knex.schema.alterTable('users', builder => {
    builder.string('device_token')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', builder => {
    builder.dropColumn('device_token')
  })
};
