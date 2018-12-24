import { SET_ACTIVE_SCENE } from './types'

export const setActiveScene = (sceneId) => ({
  type: SET_ACTIVE_SCENE,
  payload: sceneId
})
