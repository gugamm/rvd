import { combineReducers } from 'redux'
import { ADD_SCENE, RENAME_APP, DELETE_SCENE, RENAME_SCENE } from './types'
import * as R from 'ramda'

const INITIAL_STATE = {
  name: 'APP',
  sceneIds: []
}

const nameReducer = (prevState = INITIAL_STATE.name, action) => {
  switch (action.type) {
    case RENAME_APP:
      return action.payload
    default:
      return prevState
  }
}

const sceneIdsReducer = (prevState = INITIAL_STATE.sceneIds, action) => {
  switch (action.type) {
    case ADD_SCENE:
      return R.append(action.payload, prevState)
    case DELETE_SCENE:
      return R.filter(
        (sceneId) => sceneId !== action.payload,
        prevState
      )
    case RENAME_SCENE:
      return R.map(
        (sceneId) => sceneId === action.payload.sceneId ? action.payload.newScene : sceneId,
        prevState
      )
    default:
      return prevState
  }
}

export const appReducer = combineReducers({
  name: nameReducer,
  sceneIds: sceneIdsReducer
})
