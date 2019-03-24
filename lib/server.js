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
  if (!string) {
    return res.redirect('/')
  }
  const page = req.query.page ? Number(req.query.page) : 1
  const itemsPerPage = 10
  try {
    const words = await api.processQuery(string)
    console.log(words)
    const findings = await api.searchLinks(words)
    console.log(findings)
    const pageCount = Math.floor(findings.length / itemsPerPage)
    const list = await api.getTitleAndDescList(
      findings.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    )
    console.log(pageCount)
    console.log(list)
    res.render('search', {
      webPages: list,
      pageNumber: page,
      pages: new Array(pageCount).fill(0).map((_, i) => i + 1)
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
