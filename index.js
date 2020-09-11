const express = require('express')
const app = express()
const port = process.env.PORT || `1337`

const cnn = require('./cnnScraper')
const fox = require('./foxScraper')

const morgan = require('morgan')
const cors = require('cors')

const whitelist = ['https://purple-news.netlify.app/', 'http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Origin not on CORS whitelist'))
    }
  }
}
app.use(cors(corsOptions))

app.use(morgan('common'))
app.use(express.json())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
// })

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