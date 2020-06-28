const AuthService = require('./../services/AuthService')
const authService = new AuthService()

class AuthController {
  constructor() {

  }

  async createUser(req, res, next) {
    try {
      const user = await authService.createUser(req.body)
      const { id, name, login, email } = user

      return res.status(201).json({ id, name, login, email })
    } catch(err) {
      next(err)
    }
  }

  async login(req, res, next) {
    const { loginOrEmail, password } = req.body
    
    try {
      const response = await authService.auth(loginOrEmail, password)
      return res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AuthController