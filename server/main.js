// express server, servers dist folder

const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

// point dist folder
app.use('/', express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, HOST, function () {
  console.log(`Express server listening at http://${HOST}:${PORT}\n`)
})
