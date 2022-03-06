const express = require('express')
const cors = require('cors')
const camelcaseKeys = require('camelcase-keys')
const axios = require('axios')
const fs = require('fs')

const app = express()

const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer

// const UserSerializer = new JSONAPISerializer('users', {
//   attributes: ['firstName', 'lastName']
// })


const classData = fs.readFileSync(
  './classes.json',
  {encoding:'utf8', flag:'r'}
)


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

app.get('/classes', (req, res, next) => {
  let rawData = JSON.parse(classData) ? JSON.parse(classData) : {}
  let jsonDS = new JSONAPIDeserializer()

  jsonDS.deserialize(JSON.parse(classData), function (err, response) {
    
    // console.log(response)

    // Deserialized data is a flat list of classes
    const classesByTeacher = response.reduce((classes, obj, i) => {
      const key = obj.teacher.slug
      
      if (!classes[key]) {
        classes[key] = {
          'classes': [],
          'name': ''
        }
      }
     
      // Add object to list for given key's value
      classes[key].name = `${obj.teacher['first-name']} ${obj.teacher['last-name']}`
      classes[key].classes.push(obj);

      return classes
    }, {})


    // Clean up data structure, 
    const simplifiedClasses = Object.keys(classesByTeacher).map((key, index) => {
      return {
        name: classesByTeacher[key]['name'], 
        classes: camelcaseKeys(
          classesByTeacher[key].classes,
          {
            "deep": true
          }
        )
      }
    })
  
    res.json({ 
      success: true,
      statusCode: 200,
      items: simplifiedClasses
    })
  })
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
