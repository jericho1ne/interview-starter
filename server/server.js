const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

// Utils
const errorLog = require('./utils/errorLog')
const cms = require('./utils/cms.js')
// const auth = require('utils/auth')

const errLog = new errorLog()

const domainAccessList = [
  'http://localhost:3000',
  'http://localhost',
]

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST",
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  "Access-Control-Allow-Credentials": true,
}

let corsOptionsDelegate = function (req, callback) {
  let corsOptions = { origin: "*" } 
  callback(null, corsOptions)
}
app.use(cors()) 

app.get('/', (req, res, next) => {
  res.send('Welcome Home');
})

app.get('/videos', (req, res, next) => {
  const selectFields = [
    'fields.title',
    'fields.artist',
    'fields.performanceTitle',
    'fields.youTubeUrl',
  ]

  const entries = cms.fetchEntries('videoPost', 100, selectFields)

  Promise.all( [ entries, ] ).then(function(results) {
    let items = results[0]

    if (!items) { 
      errLog.print(req?.originalUrl, req?.params, 'No items found.')
      return
    }
    
    res.json({ 
      success: true,
      statusCode: 200,
      items,
    })
  })

})

app.listen(8888, function () {
  console.log('Web server listening on port 8888')
})
