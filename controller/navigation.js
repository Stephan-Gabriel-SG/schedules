const navRouter = require('express').Router()
const { Schedule } = require('../model/Schedule')
navRouter.get('/', (req, res, next) => {
  res.render('pages/accueil.ejs')
})
navRouter.get('/addPlan', (req, res, next) => {
  res.render('pages/addForm.ejs', {
    inputs: [
      { label: 'MODULE', type: 'text', name: 'module' },
      { label: 'PROF', type: 'text', name: 'prof' },
      { label: 'CREDIT', type: 'number', name: 'credit' },
      { label: 'NIVEAU', type: 'text', name: 'niveau' },
      { label: 'DATE', type: 'date', name: 'date_' },
      { label: 'SALLE', type: 'text', name: 'salle' },
    ],
  })
})
navRouter.get('/viewPlan', (req, res, next) => {
  Schedule.findAll({})
    .then((result) => {
      return res.status(200).render('pages/listPlan.ejs', { list: result })
    })
    .catch((error) => res.status(500).send({ error: 'internal server error' }))
})

module.exports = navRouter
