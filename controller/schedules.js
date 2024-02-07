const scheduleRoute = require('express').Router()
const { Schedule } = require('../model/Schedule')
/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Récupère la liste des enregistrements d'EDT
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
scheduleRoute.get('/', (req, res, next) => {
  Schedule.findAll({})
    .then((result) => res.status(200).send({ list: result }))
    .catch((error) => res.status(500).send({ error: error }))
})
scheduleRoute.get('/:id', (req, res, next) => {
  Schedule.findOne({ where: { id: req.params.id } })
    .then((sc) => {
      if (sc) {
        res.status(200).send(sc)
      } else {
        res.status(404).send({ error: 'invalid id' })
      }
    })
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
    .then((result) => res.status(201).send({ record: result }))
    .catch((error) => res.status(500).send({ error }))
})

scheduleRoute.put('/update/:id', async (req, res, next) => {
  console.log('body:', req.body)
  const body = req.body
  Schedule.update(body, { where: { id: req.params.id } })
    .then((result) => res.status(200).send({ record: result }))
    .catch((error) => res.status(500).send({ error }))
})
module.exports = scheduleRoute
