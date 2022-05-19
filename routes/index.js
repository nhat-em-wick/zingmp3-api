const zingRoute = require('./zing')
const prefix = "/api/v1"

function route (app) {
  app.use(`${prefix}/zing-mp3`, zingRoute)
}

module.exports = route