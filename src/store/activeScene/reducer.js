import { SET_ACTIVE_SCENE } from './types'

const INITIAL_STATE = null

export const activeSceneReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_SCENE:
      return action.payload
    default:
      return prevState
  }
}
