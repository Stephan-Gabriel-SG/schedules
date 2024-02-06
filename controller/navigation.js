const navRouter = require('express').Router()

navRouter.get('/', (req, res, next) => {
  res.render('pages/accueil.ejs')
})
navRouter.get('/addPlan', (req, res, next) => {
  res.render('pages/addForm.ejs', {
    inputs: [
      { label: 'MODULE', type: 'text' },
      { label: 'PROF', type: 'text' },
      { label: 'CREDIT', type: 'number' },
      { label: 'NIVEAU', type: 'text' },
      { label: 'DATE', type: 'date' },
      { label: 'SALLE', type: 'text' },
    ],
  })
})
navRouter.get('/viewPlan', (req, res, next) => {
  res.render('pages/listPlan.ejs')
})

module.exports = navRouter
