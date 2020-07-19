const axios = require('axios').default

const FCM_KEY = process.env.FCM_KEY || ''
const api = axios.create({
  baseURL: 'https://fcm.googleapis.com',
  headers: {
    'Authorization': `key=${FCM_KEY}`,
    'ConContent-Type': 'application/json',
  },
})

const sendPushNotification = async ({ title, body }, deviceToken) => {
  try {
    await api.post('/fcm/send', {
      notification: {
        title,
        body,
        sound: 'default',
      },
      to: deviceToken,
    })

    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  sendPushNotification,
}
