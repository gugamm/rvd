import { ControlPaneType } from '../../constants'
import { SET_ACTIVE_CONTROL_PANE } from './types'

const INITIAL_STATE = ControlPaneType.COMPONENT_SELECTION

export const activeControlPaneReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_CONTROL_PANE:
      return action.payload
    default:
      return prevState
  }
}
