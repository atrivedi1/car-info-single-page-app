const nock = require('nock')
const request = require('supertest')("http://gmapi.azurewebsites.net")
const expect = require('chai').expect

describe("Testing HTTP routes related to the engine", function () {

  it("returns a successful mocked response when taking action on the engine", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/actionEngineService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        status: "success"
      })

    //perform the request to the api which will now be intercepted by nock
    request
      .post('/actionEngineService')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.status).to.equal("success")
        done()
      })
  })
})
