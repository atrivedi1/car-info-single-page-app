'use strict'
//NOTE: If I had more time I would refactor to make this more DRY
const nock = require('nock')
const requestPromise = require('request-promise')
const baseGmApiUrl = 'http://gmapi.azurewebsites.net'

const requestOptions = {
  url: null,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { id: null, responseType: 'JSON' },
  json: true
}

module.exports = {
  getVehicleInfo: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getVehicleInfoService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((vehicleInfo) => {
        let doorCount = vehicleInfo.data.fourDoorSedan.value ? 4 : 2

        let cleanedUpVehicleInfo = {
          vin: vehicleInfo.data.vin.value,
          color: vehicleInfo.data.color.value,
          doorCount: doorCount,
          driveTrain: vehicleInfo.data.driveTrain.value
        }

        res.status(200).json(cleanedUpVehicleInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  },

  getSecurityInfo: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getSecurityStatusService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((securityInfo) => {
        let cleanedUpSecurityInfo = [
          { location: securityInfo.data.doors.values[0].location.value,
            locked: Boolean(securityInfo.data.doors.values[0].locked.value) },

          { location: securityInfo.data.doors.values[1].location.value,
            locked: Boolean(securityInfo.data.doors.values[1].locked.value) }
        ]

        res.status(200).json(cleanedUpSecurityInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  },

  getFuelRange: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getEnergyService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((energyInfo) => {
        let fuelRangeInfo = { "percent": energyInfo.data.tankLevel.value }
        res.status(200).json(fuelRangeInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  },

  getBatteryRange: function(req, res, cb) {
    requestOptions.url = baseGmApiUrl + '/getEnergyService'
    requestOptions.body.id = req.params.carId.slice(1)

    requestPromise(requestOptions)
      .then((energyInfo) => {
        let batteryRangeInfo = { "percent": energyInfo.data.batteryLevel.value }
        res.status(200).json(batteryRangeInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  }
}
