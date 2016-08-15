const requestPromise = require('request-promise')
const baseGmApiUrl = 'http://gmapi.azurewebsites.net'

const requestOptions = {
  url: null,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { id: null, command: null, responseType: 'JSON' },
  json: true
}

module.exports = {
  startStopEngine: function(req, res) {
    requestOptions.url = baseGmApiUrl + '/actionEngineService'
    requestOptions.body.id = req.params.carId.slice(1)
    requestOptions.body.command = req.body.action === "START" ? "START_VEHICLE" : "STOP_VEHICLE"

    requestPromise(requestOptions)
      .then((engineInfo) => {
        let startStopStatus = engineInfo.actionResult.status === "EXECUTED" ? "success" : "error"
        let cleanedUpEngineInfo = { status: startStopStatus }
        res.status(200).json(cleanedUpEngineInfo)
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  }
}
