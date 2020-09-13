require('dotenv').config();
const express = require('express')
const app = express()

const cnn = require('./cnnScraper')
const fox = require('./foxScraper')

const morgan = require('morgan')
// const cors = require('cors')

// const whitelist = ['https://purple-news.netlify.app/', 'http://localhost:3000']
// const corsOptions = {
//   origin: (origin, callback) => {
//     if(whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Origin not on CORS whitelist'))
//     }
//   }
// }
// app.use(cors(corsOptions))

app.use(morgan('common'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

app.use('/cnn', cnn);
app.use('/fox', fox)

app.get('/', (req, res) => {
  res.json('Scraper says hello Oojoo!')
})

// app.get('/cnn', async (req, res) => {
//   const scraped = await cnn.scrapeCnn()
//   res.json(scraped)
// })

// app.get('/fox', async (req, res) => {
//   const scraped = await fox.scrapeFox()
//   res.json(scraped)
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 2222
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})