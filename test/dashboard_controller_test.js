//used template found in:
//https://tobythetesterblog.wordpress.com/2016/05/01/
//mocking-a-restful-api-using-nock-supertest-mocha-and-chai/

const nock = require('nock')
const request = require('supertest')("http://gmapi.azurewebsites.net")
const expect = require('chai').expect

describe("Testing HTTP routes related to the dashboard", function () {

  it("returns a successful mocked response for vechicle info", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getVehicleInfoService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "vin": "1213231",
        "color": "Metallic Silver",
        "doorCount": 4,
        "driveTrain": "v8"
      })

    //perform the request to the api which will now be intercepted by nock
    request
      .post('/getVehicleInfoService')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.vin).to.equal("1213231")
        expect(res.body.color).to.equal("Metallic Silver")
        expect(res.body.doorCount).to.equal(4)
        expect(res.body.driveTrain).to.equal("v8")
        done()
      })
  })

  it("returns a successful mocked response for security info", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getSecurityStatusService')
      //respond with a OK and the specified JSON response
      .reply(200, [
        {
          "location": "frontLeft",
          "locked": true
        },
        {
          "location": "frontRight",
          "locked": true
        }
      ])

    //perform the request to the api which will now be intercepted by nock
    request
      .post('/getSecurityStatusService')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body[0].location).to.equal("frontLeft")
        expect(res.body[0].locked).to.equal(true)
        expect(res.body[1].location).to.equal("frontRight")
        expect(res.body[1].locked).to.equal(true)
        done()
      })
  })

  it("returns a successful mocked response for fuel range", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getEnergyService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "percent": 50
      })

    //perform the request to the api which will now be intercepted by nock
    request
      .post('/getEnergyService')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.percent).to.equal(50)
        done();
      })
  })

  it("returns a successful mocked response for battery range", function (done) {
    //specify the url to be intercepted
    nock("http://gmapi.azurewebsites.net")
      //define the method to be intercepted
      .post('/getEnergyService')
      //respond with a OK and the specified JSON response
      .reply(200, {
        "percent": null
      })

    //perform the request to the api which will now be intercepted by nock
    request
      .post('/getEnergyService')
      .end(function (err, res) {
        //assert that the mocked response is returned
        expect(res.body.percent).to.equal(null)
        done()
      })
  })
})
