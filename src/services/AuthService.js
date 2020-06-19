const knex = require('./../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

class AuthService {
  constructor() {

  }

  async createUser({ name, login, email, password }) {
    const user = {
      id: uuid.v4(),
      name,
      login,
      email,
      password: bcrypt.hashSync(password, 10),
      active: true
    }

    return (await knex('users').insert(user, '*'))[0]
  }

  async auth(loginOrEmail, password) {
    const user = await knex('users')
      .where((query) => {
        query.where({ login: loginOrEmail }).orWhere({ email: loginOrEmail })
      })
      .andWhere({ active: true })
      .first()

    if (user && bcrypt.compareSync(password, user.password)) {
      const { id, name, login, email } = user
      const token = jwt.sign({ id }, 'my-temp-secret-key', { expiresIn: '1h' })

      // update user's last login date
      await knex('users').where({ id }).update({ last_login: new Date() })

      return { user: { id, name, login, email }, accessToken: `Bearer ${token}` }
    }

    return null
  }

  static getTokenData(headerToken) {
    const token = headerToken.length >= 7 ? headerToken.substring(7, headerToken.length) : ''

    try {
      jwt.verify(token, 'my-temp-secret-key')
      
      const { id } = jwt.decode(token)
      
      return { id }
    } catch (err) {
      return null
    }
  }
}

module.exports = AuthService
