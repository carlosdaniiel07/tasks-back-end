const AuthService = require('./../services/AuthService')

module.exports = () => {
  return (req, res, next) => {
    const authUrl = '/auth'

    if (req.url !== authUrl) {
      const token = req.headers.authorization

      if (!token) {
        return res.status(400).json({ message: 'No access token provided' })
      }

      const { id: userId } = AuthService.getTokenData(token)

      if (!userId) {
        return res.status(403).json({ message: 'Invalid credentials' })
      }

      req.userId = userId
    }

    next()
  }
}