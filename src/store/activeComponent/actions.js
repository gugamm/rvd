import { SET_ACTIVE_COMPONENT } from './types'

export const setActiveComponent = (componentId) => ({
  type: SET_ACTIVE_COMPONENT,
  payload: componentId
})
