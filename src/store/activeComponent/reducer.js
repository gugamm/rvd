import { SET_ACTIVE_COMPONENT } from './types'

const INITIAL_STATE = null

export const activeComponentReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_COMPONENT:
      return action.payload
    default:
      return prevState
  }
}
