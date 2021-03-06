const authService = require('../services/auth')

const createUser = async (req, res) => {
  // const user = await authService.createUser(req.body)
  // const { id, name, login, email } = user
  // return { status: 201, data: { id, name, login, email } }
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