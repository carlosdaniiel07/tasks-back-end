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
        return res.status(400).json({ message: 'No access token provided' })
      }

      const tokenData = AuthService.getTokenData(token)

      if (!tokenData) {
        return res.status(403).json({ message: 'Invalid credentials' })
      }

      req.userId = tokenData.id
    }

    next()
  }
}