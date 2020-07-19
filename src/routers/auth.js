const { body } = require('express-validator')

const requestValidator = require('../middlewares/requestValidator')
const cleanController = require('../middlewares/cleanController')

const authController = require('../controllers/auth.controller')

const auth = routes => {
  routes.post('/sign-up', requestValidator([
    body('name').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 40 }),
    body('login').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 30 }),
    body('email').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 30 }).isEmail(),
    body('password').notEmpty({ ignore_whitespace: true }).isLength({ min: 6, max: 20 }),
  ]), cleanController(authController.createUser))
  
  routes.post('/auth', requestValidator([
    body('loginOrEmail').notEmpty({ ignore_whitespace: true }),
    body('password').notEmpty(),
  ]), cleanController(authController.login))
}

module.exports = auth
