const express = require('express')
const navRouter = require('./controller/navigation')
const scheduleRouter = require('./controller/schedules')
const app = express()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(__dirname + '/views/public'))
app.set('views engine', 'ejs')

app.use('/', navRouter)
app.use('/api/schedules', scheduleRouter)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Weekly Schedule',
      version: '1.0.0',
      description:
        "l'API Weekly Schedule a été developper pour aider les enseignants et etudiants au sujet de leurs EDT",
    },
  },
  // Chemin vers les fichiers contenant la description de l'API
  apis: [`${__dirname}/controller/*.js`],
}

// Initialisation de Swagger avec les options de configuration
const specs = swaggerJsdoc(options)

// Middleware pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((req, res, next) => {
  res.status(404).send({ error: 'page not found' })
})
module.exports = app
