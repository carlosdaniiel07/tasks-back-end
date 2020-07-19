const knex = require('./../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const { ApiError } = require('./../middlewares/errorHandler')

const JWT_SECRET = process.env.JWT_SECRET || 'my-temp-secret-key'
class AuthService {
  constructor() {

  }

  async createUser({ name, login, email, password }) {
    const user = await knex('users').where({ login }).orWhere({ email }).first()

    if (user) {
      throw new ApiError(400, 'Já existe um usuário cadastrado com este login ou com este e-mail')
    }

    const newUser = {
      id: uuid.v4(),
      name,
      login,
      email,
      password: bcrypt.hashSync(password, 10),
      active: true
    }

    return (await knex('users').insert(newUser, '*'))[0]
  }

  async auth(loginOrEmail, password, deviceToken) {
    const user = await knex('users')
      .where((query) => {
        query.where({ login: loginOrEmail }).orWhere({ email: loginOrEmail })
      })
      .andWhere({ active: true })
      .first()

    if (user && bcrypt.compareSync(password, user.password)) {
      const { id, name, login, email } = user
      const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' })

      // update user's last login date and device token
      await knex('users').where({ id }).update({ last_login: new Date(), device_token: deviceToken })

      return { user: { id, name, login, email }, accessToken: `Bearer ${token}` }
    }

    throw new ApiError(401, 'Usuário ou senha incorretos')
  }

  static getTokenData(headerToken) {
    const token = headerToken.length >= 7 ? headerToken.substring(7, headerToken.length) : ''

    try {
      jwt.verify(token, JWT_SECRET)
      
      const { id } = jwt.decode(token)
      
      return { id }
    } catch (err) {
      return null
    }
  }
}

module.exports = AuthService
