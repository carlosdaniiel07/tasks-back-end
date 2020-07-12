const uuid = require('uuid')
const bcrypt = require('bcrypt')

exports.seed = async knex => {
  console.log('[INFO] Running seedUsers')

  const newUser = {
    id: uuid.v4(),
    name: 'test',
    login: 'test',
    email: 'test@test.com',
    password: bcrypt.hashSync('test', 10),
    active: true
  }

  await knex('users').insert(newUser)
}
