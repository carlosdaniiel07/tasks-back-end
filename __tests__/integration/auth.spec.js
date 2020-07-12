const app = require('./../../src/app')
const knex = require('./../../src/database/connection')
const request = require('supertest')

describe('test suite for auth functions', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()

    console.log('[INFO] Test database created')
  })

  afterAll(async () => {
    await knex.migrate.rollback({}, true)
    await knex.destroy()
    
    console.log('[INFO] Test database droped')
  })

  it('should responds with user data and an access token', async () => {
    const authObj = {loginOrEmail: 'test', password: 'test'}
    const response = await request(app).post('/auth').send(authObj)

    expect(response.status).toBe(200)
    
    // expects 'user' object
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).toHaveProperty('id')
    expect(response.body.user).toHaveProperty('name')
    expect(response.body.user).toHaveProperty('login')
    expect(response.body.user).toHaveProperty('email')

    // expects 'accessToken' object
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body.accessToken.substring(0, 6)).toBe('Bearer')
  })

  it('should responds with a 401 and a message', async () => {
    const authObj = {loginOrEmail: 'err', password: 'err'}
    const response = await request(app).post('/auth').send(authObj)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })
})
