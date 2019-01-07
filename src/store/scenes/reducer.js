import { combineReducers } from 'redux'
import * as R from 'ramda'
import { ADD_SCENE, DELETE_SCENE, RENAME_SCENE } from '../app/types'
import { DELETE_COMPONENTS } from '../components/types'
import { APPEND_COMPONENT, INSERT_AFTER, INSERT_BEFORE, APPEND_COMPONENT_TREE, INSERT_TREE_BEFORE, INSERT_TREE_AFTER } from './types'

const INITIAL_SCENE_STATE = {
  componentIds: []
}

const sceneReducer = (prevState = INITIAL_SCENE_STATE, action) => {
  switch (action.type) {
    case INSERT_BEFORE: {
      const indexToInsert = R.findIndex(R.equals(action.payload.targetComponentId), prevState.componentIds)
      return {
        ...prevState,
        componentIds: R.insert(indexToInsert, action.payload.component.id, prevState.componentIds)
      }
    }
    case INSERT_AFTER: {
      const indexToInsert = R.findIndex(R.equals(action.payload.targetComponentId), prevState.componentIds) + 1
      return {
        ...prevState,
        componentIds: R.insert(indexToInsert, action.payload.component.id, prevState.componentIds)
      }
    }
    case APPEND_COMPONENT:
      return {
        ...prevState,
        componentIds: R.append(action.payload.component.id, prevState.componentIds)
      }
    case INSERT_TREE_AFTER: {
      const { afterId, componentTree: { rootComponentId } } = action.payload
      const indexToInsert = R.findIndex(R.equals(afterId), prevState.componentIds) + 1
      return {
        ...prevState,
        componentIds: R.insert(indexToInsert, rootComponentId, prevState.componentIds)
      }
    }
    case INSERT_TREE_BEFORE: {
      const { beforeId, componentTree: { rootComponentId } } = action.payload
      const indexToInsert = R.findIndex(R.equals(beforeId), prevState.componentIds)
      return {
        ...prevState,
        componentIds: R.insert(indexToInsert, rootComponentId, prevState.componentIds)
      }
    }
    case APPEND_COMPONENT_TREE: {
      const { componentTree: { rootComponentId } } = action.payload
      return {
        ...prevState,
        componentIds: R.append(rootComponentId, prevState.componentIds)
      }
    }
    case DELETE_COMPONENTS:
      return {
        ...prevState,
        componentIds: R.filter((componentId) => !R.contains(componentId, action.payload.componentIds), prevState.componentIds)
      }
    default:
      return prevState
  }
}

const INITIAL_STATE = {
  byId: {},
  allIds: []
}

export const byIdReducer = (prevState = INITIAL_STATE.byId, action) => {
  switch (action.type) {
    case ADD_SCENE:
      return R.assoc(action.payload, sceneReducer(undefined, action), prevState)
    case DELETE_SCENE:
      return R.dissoc(action.payload, prevState)
    case RENAME_SCENE: {
      const prevScene = prevState[action.payload.sceneId]
      const stateWithoutScene = R.dissoc(action.payload.sceneId, prevScene)
      return R.assoc(action.payload.newSceneId, prevScene, stateWithoutScene)
    }
    case APPEND_COMPONENT:
    case INSERT_AFTER:
    case APPEND_COMPONENT_TREE:
    case INSERT_TREE_AFTER:
    case INSERT_TREE_BEFORE:
    case INSERT_BEFORE: {
      return {
        ...prevState,
        [action.payload.sceneId]: sceneReducer(prevState[action.payload.sceneId], action)
      }
    }
    case DELETE_COMPONENTS: {
      return R.map((prevScene) => sceneReducer(prevScene, action), prevState)
    }
    default:
      return prevState
  }
}

export const allIdsReducer = (prevState = INITIAL_STATE.allIds, action) => {
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
        (sceneId) => sceneId === action.payload.sceneId ? action.payload.newSceneId : sceneId,
        prevState
      )
    default:
      return prevState
  }
}

export const scenesReducer = combineReducers({
  byId: byIdReducer,
  allIds: allIdsReducer
})
