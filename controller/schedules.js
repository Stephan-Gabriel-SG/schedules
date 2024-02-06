const scheduleRoute = require('express').Router()
const Schedule = require('../model/Schedule')

scheduleRoute.get('/', (req, res, next) => {
  Schedule.findAll()
    .then((result) => res.status(200).send({ list: result }))
    .catch((error) => res.status(500).send({ error: error }))
})

module.exports = scheduleRoute
