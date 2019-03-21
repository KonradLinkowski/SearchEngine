require('dotenv').config()
const express = require('express')
const expHandlebars = require('express-handlebars')
const api = require('./api')
 
const app = express()
  
app.engine('handlebars', expHandlebars({ defaultLayout: 'main', helpers: require('./helpers') }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/search/', async (req, res) => {
  const string = req.query.string
  try {
    const words = await api.processQuery(string)
    const page = req.query.page
    res.render('search', {
      webPages: require('./mock')(30),
      pageNumber: page,
      pageCount: 10//new Array(Math.floor(Math.random() * 10)).fill(0).map((_, i) => i + 1)
    })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
})

app.get('*', (req, res) => {
  res.status(404).render('notfound')
})

app.listen(process.env.PORT, () => {
  console.log('Server started at port', process.env.PORT)
})
