/* eslint-env mocha */
var app = require('..')
var request = require('supertest')
var pug = require('pug')
require('should')

describe('index', function () {
  it('should work!', function (done) {
    request(app)
      .get('/')
      .expect(200, done)
  })
  it('should have some CSS', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.containEql('<link rel="stylesheet"')
        done()
      })
  })
  it('should render pug', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) throw err
        // checks for a string that is only in an unbuffered comment
        res.text.should.not.containEql('squeamish ossifrage')
        done()
      })
  })
})

describe('routes', function () {
  it('should 404 on non-existent', function (done) {
    request(app)
      .get('/404')
      .expect(404, done)
  })
  it('should 404 with some pretty HTML', function (done) {
    request(app)
      .get('/404')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.containEql('<!DOCTYPE html>')
        res.text.should.containEql('Not Found')
        done()
      })
  })
  var routes = [
    '/'
  ]
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i]
    it('route ' + route + ' should 200', function (done) {
      request(app)
        .get(route)
        .expect(200, done)
    })
  }
})
describe('pug rendering', function () {
  var f = [
    '404.pug',
    '500.pug',
    'hello.pug'
  ]
  for (var i = 0; i < f.length; i++) {
    var template = f[i]
    it('should render ' + f[i], function (done) {
      pug.renderFile('views/' + template, null, done)
    })
  }
})
