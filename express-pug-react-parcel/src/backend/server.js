const path = require('path')
const express = require('express')

const app = express()
const port = 1234

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'pug'))

app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.status(200).render('app', {
    defaults: {
      ping: 'pong',
      NODE_ENV: process.env.NODE_ENV
    }
  })
})
