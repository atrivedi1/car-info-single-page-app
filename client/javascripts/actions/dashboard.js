const baseUrl = 'http://localhost:3000'

function selectCar(dispatch, selected) {
  let carSelected = selected.target.value

  dispatch({
    type: "CAR_SELECTED",
    carSelected
  })
}

function fetchCarData(dispatch, carId) {
  $.when(
    $.ajax({
      type: 'GET',
      url: baseUrl + '/vehicles/:' + carId,
      data: { carId: carId },
      success: function(data) {
        console.log("vehicle info request complete")
      }
    }),

    $.ajax({
      type: 'GET',
      url: baseUrl + '/vehicles/:' + carId + '/doors',
      data: { carId: carId },
      success: function(data) {
        console.log("security request complete")
      }
    }),

    $.ajax({
      type: 'GET',
      url: baseUrl + '/vehicles/:' + carId + '/fuel',
      data: { carId: carId },
      success: function(data) {
        console.log("fuel request complete")
      }
    }),

    $.ajax({
      type: 'GET',
      url: baseUrl + '/vehicles/:' + carId + '/battery',
      data: { carId: carId },
      success: function(data) {
        console.log("battery request complete")
      }
    })
  )
  .then((dataFromVehicleReq, dataFromSecurityReq, dataFromFuelReq, dataFromBatteryReq) => {
    let vehicleInfo = dataFromVehicleReq[0]
    let securityInfo = dataFromSecurityReq[0]
    let fuelRange = dataFromFuelReq[0]
    let batteryRange = dataFromBatteryReq[0]

    dispatch(retrievedCarData(vehicleInfo, securityInfo, fuelRange, batteryRange))
  })
}

function retrievedCarData(vehicleInfo, securityInfo, fuelRange, batteryRange) {
  let carData = {
    vehicleInfo: vehicleInfo,
    securityInfo: securityInfo,
    fuelRange: fuelRange,
    batteryRange: batteryRange
  }

  return {
    type: "DATA_FOR_CAR_RETRIEVED",
    carData
  }
}

module.exports = {
  selectCar,
  fetchCarData
}

