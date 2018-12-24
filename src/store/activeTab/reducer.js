import { SET_ACTIVE_TAB } from './types'

const INITIAL_STATE = '+'

export const activeTabReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return action.payload
    default:
      return prevState
  }
}
