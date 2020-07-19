
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

    if (statusCode) {
      return res.status(statusCode).json({ message })
    } else {
      return res.status(500).json({ message: 'Ocorreu um erro desconhecido ao processar a sua requisição. Tente novamente mais tarde.' })
    }
  }
}

module.exports = {
  ApiError,
  errorHandler
}
