var express = require('express')
var path = require('path') // core
var app = module.exports = express()

app.set('view engine', 'pug')
app.locals.pretty = true

app.use('/', express.static(path.join(__dirname, 'public')))

require('./routes')

if (app.get('env') === 'test') {
  // make it easier to develop and test at the same time
  app.listen(3000)
} else {
  app.listen(8080)
}
