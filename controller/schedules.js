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
    const { module, prof, credit, niveau, salle, date_ } = req.body
    const newSchedule = await Schedule.create({
      module,
      prof,
      credit,
      niveau,
      salle,
      date_,
    })
    res.status(201).send({ result: newSchedule })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = scheduleRoute
