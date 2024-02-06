const express = require('express')
const app = express()
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  res.render('accueil')
})

app.use((req, res, next) => {
  res.status(404).send({ error: 'page not found' })
})

module.exports = app
