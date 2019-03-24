require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const expHandlebars = require('express-handlebars')
const api = require('./api')
 
const app = express()
  
app.engine('handlebars', expHandlebars({ defaultLayout: 'main', helpers: require('./helpers') }))
app.set('view engine', 'handlebars')

app.use('/public', express.static(path.join(path.dirname(__dirname), 'public')))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/search/', async (req, res) => {
  const string = req.query.string
  try {
    const words = await api.processQuery(string)
    console.log(words)
    const findings = await api.searchLinks(words)
    console.log(findings)
    const list = await api.getTitleAndDescList(findings)
    console.log(list)
    const page = req.query.page
    res.render('search', {
      webPages: list,
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

mongoose.connect(process.env.MONGO_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Connected to database')
  app.listen(process.env.PORT, () => {
    console.log('Server started at port', process.env.PORT)
  })
})
.catch(err => {
  console.error(err)
})
