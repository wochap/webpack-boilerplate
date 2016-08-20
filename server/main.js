// express server, serves dist folder

const express = require('express')
const path = require('path')
const myIp = require('my-ip')

const app = express()

const PORT = process.env.PORT || 8080
const CURRENT_IP = myIp()

// point dist folder
app.use('/', express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, '0.0.0.0', function () {
  console.log('Express server listening at:')
  console.log(`http://localhost:${PORT}`)
  console.log(`http://${CURRENT_IP}:${PORT}\n`)
})
