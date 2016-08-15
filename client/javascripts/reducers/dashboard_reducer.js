const Immutable = require('immutable')

const initialDashboardState = Immutable.fromJS({
  carId: "1234",
  carInformation: {
    vehicleInfo: "",
    securityInfo: "",
    fuelRange: "",
    batteryRange: "",
  },
  displayEngineInfo: false
})

function DashboardReducer(state, action) {
  state = state ? state : initialDashboardState

  if (!(action instanceof Immutable.Map)) {
    action = Immutable.fromJS(action)
  }

  switch (action.get('type')) {
    case "CAR_SELECTED": {
      return state.set('carId', action.get('carSelected'))
    }

    case "DATA_FOR_CAR_RETRIEVED": {
      //vehicle information
      let vehicleColor = action.getIn(['carData', 'vehicleInfo', 'color']).toLowerCase()
      let vehicleDoorCount = action.getIn(['carData', 'vehicleInfo', 'doorCount'])
      let vehicleDriveTrain = action.getIn(['carData', 'vehicleInfo', 'driveTrain'])
      let vehicleVin = action.getIn(['carData', 'vehicleInfo', 'vin'])

      let vehicleInfo =
        vehicleDoorCount + " door " +
        vehicleColor + " " +
        vehicleDriveTrain +
        " (VIN:" + vehicleVin + ")"

      //security information
      let location1 = action.getIn(['carData', 'securityInfo', 0, 'location']).toLowerCase()

      let location1SecurityStatus =
        action.getIn(['carData', 'securityInfo', 0, 'locked']) ? "locked" : "unlocked"

      let location2 = action.getIn(['carData', 'securityInfo', 1, 'location']).toLowerCase()

      let location2SecurityStatus =
        action.getIn(['carData', 'securityInfo', 0, 'locked']) ? "locked" : "unlocked"

      let securityInfo =
        location1 + " door is " +  location1SecurityStatus + "; " +
        location2 + " door is " + location2SecurityStatus

      //energy information
      let rawFuelData = action.getIn(['carData', 'fuelRange', 'percent'])
      let fuelRange = rawFuelData !== "null" ? rawFuelData + "%" : "N/A"
      let rawBatteryData = action.getIn(['carData', 'batteryRange', 'percent'])
      let batteryRange = rawBatteryData !== "null" ? rawBatteryData + "%" : "N/A"

      //update state
      return state
        .setIn(['carInformation','vehicleInfo'], vehicleInfo)
        .setIn(['carInformation','securityInfo'], securityInfo)
        .setIn(['carInformation','fuelRange'], fuelRange)
        .setIn(['carInformation','batteryRange'], batteryRange)
        .set('displayEngineInfo', true)
    }

    default: {
      return state
    }
  }
}

module.exports = DashboardReducer