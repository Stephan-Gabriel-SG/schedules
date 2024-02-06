const app = require('./app')
// const { sequelize } = require('./model/Schedule')
const PORT = 3000

// sequelize
//   .authenticate()
//   .then(() =>
//     console.log('Connection with mysql has been established successfully.')
//   )
//   .catch((error) => console.error('Error connection with mysql:', error))

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
