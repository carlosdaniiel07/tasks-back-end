const AuthService = require('./../services/AuthService')
const authService = new AuthService()

class AuthController {
  constructor() {

  }

  async createUser(req, res, next) {
    try {
      // const user = await authService.createUser(req.body)
      // const { id, name, login, email } = user

      // return res.status(201).json({ id, name, login, email })
      return res.status(400).json({ message: 'Funcionalidade desativada temporariamente' })
    } catch(err) {
      next(err)
    }
  }

  async login(req, res, next) {
    const { loginOrEmail, password, device_token: deviceToken } = req.body
    
    try {
      const response = await authService.auth(loginOrEmail, password, deviceToken)
      return res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AuthController