const CronJob = require('cron').CronJob

const taskService = require('./../services/task')
const authService = require('./../services/auth')
const notificationService = require('./../services/notification')

const TIME_ZONE = 'America/Sao_Paulo'

const startAll = () => {
  // fire at 20:00 PM every day
  const notifyOverdueTasksJob = new CronJob('0 20 * * *', notifyOverdueTasks, null, false, TIME_ZONE)
  notifyOverdueTasksJob.start()
}

const notifyOverdueTasks = async () => {
  console.log('Running job [notifyOverdueTasks]')

  const tasks = await taskService.getAllPendingAndOverdue()

  for (const [_, task] of tasks.entries()) {
    if (task.notify) {
      const deviceToken = await authService.getDeviceTokenByUserId(task.user_id)

      if (deviceToken) {
        await notificationService.sendPushNotification({
          title: `Tarefa atrasada`,
          body: `A tarefa ${task.description} está atrasada!`
        }, deviceToken)
      }
    }
  }

  console.log('Finished job [notifyOverdueTasks]')
}

module.exports = {
  startAll,
}
