import { ADD_SCENE, DELETE_SCENE, RENAME_APP, RENAME_SCENE } from './types'

export const addScene = (sceneId) => ({
  type: ADD_SCENE,
  payload: sceneId
})

export const deleteScene = (sceneId) => ({
  type: DELETE_SCENE,
  payload: sceneId
})

export const renameScene = (sceneId, newSceneId) => ({
  type: RENAME_SCENE,
  payload: {
    sceneId,
    newSceneId
  }
})

export const renameApp = (newAppName) => ({
  type: RENAME_APP,
  payload: newAppName
})
