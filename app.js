const express = require('express')
const navRouter = require('./controller/navigation')
const scheduleRoute = require('./controller/schedules')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(__dirname + '/views/styles'))
app.set('views engine', 'ejs')
app.use('/', navRouter)
app.use('/api/schedules', scheduleRoute)

app.use((req, res, next) => {
  res.status(404).send({ error: 'page not found' })
})
module.exports = app
