const app = require('./../../src/app')
const knex = require('./../../src/database/connection')

const request = require('supertest')
const uuid = require('uuid')

describe('test suite for /tasks endpoint', () => {
  let accessToken = null

  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()

    console.log('[INFO] Test database created')

    // get an access token
    accessToken = (await request(app).post('/auth').send({ loginOrEmail: 'test', password: 'test' })).body.accessToken
  })

  afterAll(async () => {
    await knex.migrate.rollback({}, true)
    await knex.destroy()

    console.log('[INFO] Test database droped')
  })

  it('should create a new task and return it', async () => {
    const newTask = {
      description: 'My test task',
      estimateDate: new Date().toISOString(),
      notify: true,
    }

    const response = await request(app).post('/tasks').set('Authorization', accessToken).send(newTask)

    expect(response.status).toBe(201)

    // expects object
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('description', newTask.description)
    expect(response.body).toHaveProperty('estimate_date')
    expect(response.body).toHaveProperty('done_date', null)
    expect(response.body).toHaveProperty('notify', newTask.notify)
    expect(response.body).toHaveProperty('created_at')
  })

  it('should responds with a JSON array (array of tasks)', async () => {
    const response = await request(app).get('/tasks').set('Authorization', accessToken)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(1)
  })

  it('should responds with a object (a single task)', async () => {
    const taskId = (await request(app).get('/tasks').set('Authorization', accessToken)).body[0].id
    
    const response = await request(app).get(`/tasks/${taskId}`).set('Authorization', accessToken)

    expect(response.status).toBe(200)

    // expects object
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('estimate_date')
    expect(response.body.estimate_date).not.toBeNull()
    expect(response.body).toHaveProperty('done_date')
    expect(response.body).toHaveProperty('notify')
    expect(response.body).toHaveProperty('created_at')
  })

  it('should mark a task as done and responds with a object', async () => {
    const taskId = (await request(app).get('/tasks').set('Authorization', accessToken)).body[0].id
    const response = await request(app).put(`/tasks/${taskId}/done`).set('Authorization', accessToken)

    expect(response.status).toBe(200)

    // expects object
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('estimate_date')
    expect(response.body).toHaveProperty('done_date')
    expect(response.body).toHaveProperty('notify')
    expect(response.body).toHaveProperty('created_at')
  })

  it('should delete a task and responds with a message', async () => {
    const taskId = (await request(app).get('/tasks').set('Authorization', accessToken)).body[0].id

    const response = await request(app).delete(`/tasks/${taskId}`).set('Authorization', accessToken)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
  })

  it('should responds with a 404 and a message (get a single task)', async () => {
    const response = await request(app).get(`/tasks/${uuid.v4()}`).set('Authorization', accessToken)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })

  it('should responds with a 404 and a message (delete a task)', async () => {
    const response = await request(app).delete(`/tasks/${uuid.v4()}`).set('Authorization', accessToken)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })

  it('should responds with a 401 and a message', async () => {
    const response = await request(app).get('/tasks')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
  })
})

