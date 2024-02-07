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

scheduleRoute.delete('/delete/:id', async (req, res, next) => {
  console.log(req.params.id)
  Schedule.destroy({ where: { id: req.params.id } })
    .then((result) => res.send(201).send({ success: result }))
    .catch((error) => res.send(500).send({ error }))
})

module.exports = scheduleRoute
