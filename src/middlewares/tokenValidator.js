const AuthService = require('./../services/AuthService')

module.exports = () => {
  return (req, res, next) => {
    const publicUrls = [
      '/',
      '/auth',
      '/sign-up'
    ]

    if (!publicUrls.includes(req.url)) {
      const token = req.headers.authorization

      if (!token) {
        return res.status(401).json({ message: 'Não foi fornecido nenhum token no cabeçalho da requisição' })
      }

      const tokenData = AuthService.getTokenData(token)

      if (!tokenData) {
        return res.status(401).json({ message: 'Token inválido ou já expirado' })
      }

      req.userId = tokenData.id
    }

    next()
  }
}