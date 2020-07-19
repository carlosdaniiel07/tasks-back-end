const AuthService = require('../services/AuthService')
const authService = new AuthService()

const createUser = async (req, res) => {
  // const user = await authService.createUser(req.body)
  // const { id, name, login, email } = user
  // return res.status(201).json({ id, name, login, email })
  return { status: 400, data: { message: 'Funcionalidade desativada temporariamente' } }
}

const login = async (req, res) => {
  const { loginOrEmail, password, deviceToken } = req.body
  const response = await authService.auth(loginOrEmail, password, deviceToken)
  
  return { status: 200, data: response }
}

module.exports = {
  createUser,
  login,
}