require('dotenv').config()
const express = require('express')
const expHandlebars = require('express-handlebars')
 
const app = express()
  
app.engine('handlebars', expHandlebars({ defaultLayout: 'main', helpers: require('./helpers') }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/search/:query', (req, res) => {
  const page = req.query.page
  res.render('search', {
    webPages: require('./mock')(30),
    pageNumber: page,
    pageCount: 10//new Array(Math.floor(Math.random() * 10)).fill(0).map((_, i) => i + 1)
  })
})

app.get('*', (req, res) => {
  res.status(404).render('notfound')
})

app.listen(process.env.PORT, () => {
  console.log('Server started at port', process.env.PORT)
})
