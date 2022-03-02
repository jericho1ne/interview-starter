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
]

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST",
  "Content-Type": "application/json"
}

let corsOptionsDelegate = function (req, callback) {
  let corsOptions

  if (domainAccessList.indexOf(req.header('Origin')) !== -1) {
    // Enable the requested origin in the CORS response
    corsOptions = { origin: true } 
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions)
}

const externalGetConfig = {
  method: 'GET',
  crossdomain: 'true',
  credentials: 'same-origin',
  mode: 'no-cors',
  headers: headers
}

app.use((req, res, next) => {
  next();
});

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
      data: items,
    })
  })

})

app.listen(8080, function () {
  console.log('Web server listening on port 8080')
})
