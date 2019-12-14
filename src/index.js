const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./app/controllers')(app)

app.listen(3001, () => {
  console.log('Listening on port 3001')
})