const AuthService = require('./../services/AuthService')
const authService = new AuthService()

class AuthController {
  constructor() {

  }

  async createUser(req, res) {
    const user = await authService.createUser(req.body)
    const { id, name, login, email } = user
    return res.status(201).json({ id, name, login, email })
  }

  async login(req, res) {
    const { loginOrEmail, password } = req.body
    const response = await authService.auth(loginOrEmail, password)

    if (!response) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json(response)
  }
}

module.exports = AuthController