const scheduleRoute = require('express').Router()
const { Schedule } = require('../model/Schedule')

scheduleRoute.get('/', (req, res, next) => {
  Schedule.findAll({})
    .then((result) => res.status(200).send({ list: result }))
    .catch((error) => res.status(500).send({ error: error }))
})

scheduleRoute.post('/add', async (req, res, next) => {
  try {
    console.log(req.body)
    const body = req.body
    const newSchedule = await Schedule.create({
      module: body.module,
      prof: body.prof,
      credit: body.credit,
      niveau: body.niveau,
      salle: body.salle,
      date_: body.date_,
    })
    res.status(201).send({ result: newSchedule })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = scheduleRoute
