import { SET_DROP_TARGET } from './types'
import { DropTypes } from '../../constants'

export const setAfterDropTarget = (componentId) => ({
  type: SET_DROP_TARGET,
  payload: {
    type: DropTypes.AFTER,
    componentId
  }
})

export const setBeforeDropTarget = (componentId) => ({
  type: SET_DROP_TARGET,
  payload: {
    type: DropTypes.BEFORE,
    componentId
  }
})

export const setNoneDropTarget = () => ({
  type: SET_DROP_TARGET,
  payload: {
    type: DropTypes.NONE,
    componentId: null
  }
})

export const setInsideDropTarget = (componentId) => ({
  type: SET_DROP_TARGET,
  payload: {
    type: DropTypes.INSIDE,
    componentId
  }
})
