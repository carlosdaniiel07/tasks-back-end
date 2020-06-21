
class ApiError extends Error{
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

const errorHandler = () => {
  return (err, req, res, next) => {
    const { statusCode, message } = err

    if (res.headersSent) {
      next(err)
    }

    return res.status(statusCode).json({ message })
  }
}

module.exports = {
  ApiError,
  errorHandler
}
