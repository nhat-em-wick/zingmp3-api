const express = require('express')

const app = express()
const port = 3001
const cors = require('cors')
const route = require('./routes')

app.use(express.json());
app.use(cors())
route(app)

app.listen(port, () => {
  console.log('server start: ' + port)
})