const nock = require('nock')
const { EventEmitter } = require('events')
const httpMock = require('node-mocks-http')
const expect = require('chai').expect

const engineController = require('../server/controllers/engine_controller.js')

describe("Testing HTTP routes related to the engine", function () {
  let req, res

  beforeEach(function(done) {
    req = httpMock.createRequest({ params: { carId: ':1234' } })
    res = httpMock.createResponse({ EventEmitter: EventEmitter })
    done()
  })

 it("returns a successful mocked response when taking action on the engine", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/actionEngineService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "service": "actionEngine",
        "status": "200",
        "actionResult": {
          "status": "EXECUTED"
        }
      })

    //perform the request to the api which will now be intercepted by nock
    engineController.startStopEngine(req, res, (err) => {
      let engineStatus = JSON.parse(res._getData())
      expect(engineStatus.status).to.equal('success')
      done()
    })
  })
})
