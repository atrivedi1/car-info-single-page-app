const Immutable = require('immutable')

const initialEngineState = Immutable.fromJS({
  engineStatus: "off"
})

function EngineReducer(state, action) {
  state = state ? state : initialEngineState

  if (!(action instanceof Immutable.Map)) {
    action = Immutable.fromJS(action)
  }

  switch (action.get('type')) {
    case "ENGINE_STATUS_CHANGED": {
      if (action.getIn(['newStatus', 'status']) === "error") {
        alert("Seems like there was a problem talking to your engine. Try again!")
        return state
      } else {
        if (state.get('engineStatus') === 'off') {
          return state.set('engineStatus', "on")
        } else {
          return state.set('engineStatus', "off")
        }
      }
    }

    default: {
      return state
    }
  }
}

module.exports = EngineReducer
