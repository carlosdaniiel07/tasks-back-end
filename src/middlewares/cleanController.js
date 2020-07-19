
const cleanController = controller => {
  if (!controller) {
    throw new Error("Controller not defined")
  }

  return async (req, res, next) => {
    try {
      const {status, data} = await controller(req, res)
      return res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = cleanController
