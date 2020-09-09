const express = require('express')
const app = express()
const port = `https://purple-news-scraper.herokuapp.com/` || `1337`

const cnn = require('./cnnScraper')
const fox = require('./foxScraper')

const morgan = require('morgan')

app.use(morgan('common'))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/', (req, res) => {
  console.log('whats good world')
  res.json('Hello World!')
})

app.get('/cnn', async (req, res) => {
  const scraped = await cnn.scrapeCnn()
  res.json(scraped)
})

app.get('/fox', async (req, res) => {
  const scraped = await fox.scrapeFox()
  res.json(scraped)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})