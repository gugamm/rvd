import { SET_DROP_TARGET } from './types'
import { DropTypes } from '../../constants'

const INITIAL_STATE = {
  type: DropTypes.NONE,
  componentId: null
}

export const dropTargetReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DROP_TARGET:
      return action.payload
    default:
      return prevState
  }
}
