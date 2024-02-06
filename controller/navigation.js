const navRouter = require('express').Router()

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
      { label: 'DATE', type: 'date', name: 'date' },
      { label: 'SALLE', type: 'text', name: 'salle' },
    ],
  })
})
navRouter.get('/viewPlan', (req, res, next) => {
  res.render('pages/listPlan.ejs')
})

module.exports = navRouter
