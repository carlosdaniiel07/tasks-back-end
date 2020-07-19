const endOfDay = date => {
  if (date) {
    const newDate = new Date(date)
    newDate.setHours(23, 59, 59, 999)
    return newDate.toJSON()
  }
}

module.exports = {
  endOfDay,
}
