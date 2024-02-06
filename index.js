const express = require('express')
const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.status(404).send({ error: 'page not found' })
})
app.listen(3000, () => console.log('server is running on port 3000'))
