function startStopEngine(dispatch, currentEngineStatus, carId) {
  let desiredEngineStatus

  if (currentEngineStatus === "on") {
    desiredEngineStatus = "STOP"
  } else {
    desiredEngineStatus = "START"
  }

  $.ajax({
    type: 'POST',
    url: '/vehicles/:' + carId + '/engine',
    data: { action: desiredEngineStatus },
    success: function(newStatus) {
      console.log("engine post request complete")
      dispatch(engineStatusChanged(newStatus))
    },
    datatype: 'json'
  })
}

function engineStatusChanged(newStatus) {
  return {
    type: "ENGINE_STATUS_CHANGED",
    newStatus
  }
}

module.exports = {
  startStopEngine
}
