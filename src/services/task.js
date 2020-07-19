const knex = require('../database/connection')
const uuid = require('uuid')

const { ApiError } = require('../middlewares/errorHandler')
const dateUtils = require('./../utils/date')

const getAll = async (maxDate, userId) => {
  if (maxDate) {
    return await knex('tasks').select('*')
      .where('estimate_date', '<=', maxDate).orWhereNull('estimate_date').andWhere({ user_id: userId })
      .orderBy('estimate_date')
  } else {
    return await knex('tasks').select('*').where({ user_id: userId }).orderBy('estimate_date')
  }
}

const getAllPendingAndOverdue = async () => {
  const now = new Date()
  return await knex('tasks')
    .where({ done_date: null }).andWhere('estimate_date', '<', now)
    .orderBy('created_at')
}

const getById = async (id, userId) => {
  const task = await knex('tasks').where({ id, user_id: userId }).select('*').first()

  if (!task) {
    throw new ApiError(404, 'Esta tarefa não foi encontrada')
  }

  return task
}

const save = async ({ description, estimateDate, notify }, userId) => {
  const task = {
    id: uuid.v4(),
    description,
    estimate_date: dateUtils.endOfDay(estimateDate),
    notify,
    created_at: new Date(),
    user_id: userId,
  }

  return (await knex('tasks').insert(task, '*'))[0]
}

const update = async (taskId, { description, estimateDate, notify, doneDate }, userId) => {
  const task = (await knex('tasks').where({ id: taskId, user_id: userId }).update({
    description,
    estimate_date: dateUtils.endOfDay(estimateDate),
    notify,
    done_date: doneDate
  }, '*'))[0]
  
  if (!task) {
    throw new ApiError(404, 'Esta tarefa não foi encontrada')
  }

  return task
}

const remove = async (id, userId) => {
  const task = (await knex('tasks').where({ id, user_id: userId }).del('*'))[0]

  if (!task) {
    throw new ApiError(404, 'Esta tarefa não foi encontrada')
  }

  return task
}

const markAsDone = async (taskId, userId) => {
  const task = await this.getById(taskId, userId)
  const doneDate = task.done_date ? null : new Date()

  return (await knex('tasks').where({ id: taskId, user_id: userId }).update({ done_date: doneDate }, '*'))[0]
}

module.exports = {
  getAll,
  getAllPendingAndOverdue,
  getById,
  save,
  update,
  remove,
  markAsDone,
}