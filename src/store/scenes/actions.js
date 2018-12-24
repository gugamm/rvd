import { APPEND_COMPONENT, INSERT_AFTER, INSERT_BEFORE, APPEND_COMPONENT_TREE, INSERT_TREE_BEFORE, INSERT_TREE_AFTER } from './types'

export const appendComponent = (sceneId, component) => ({
  type: APPEND_COMPONENT,
  payload: {
    sceneId,
    component
  }
})

export const appendComponentTree = (sceneId, componentTree) => ({
  type: APPEND_COMPONENT_TREE,
  payload: {
    sceneId,
    componentTree
  }
})

export const insertTreeBefore = (sceneId, beforeId, componentTree) => ({
  type: INSERT_TREE_BEFORE,
  payload: {
    sceneId,
    beforeId,
    componentTree
  }
})

export const insertTreeAfter = (sceneId, afterId, componentTree) => ({
  type: INSERT_TREE_AFTER,
  payload: {
    sceneId,
    afterId,
    componentTree
  }
})

export const insertAfter = (sceneId, targetComponentId, component) => ({
  type: INSERT_AFTER,
  payload: {
    sceneId,
    targetComponentId,
    component
  }
})

export const insertBefore = (sceneId, targetComponentId, component) => ({
  type: INSERT_BEFORE,
  payload: {
    sceneId,
    targetComponentId,
    component
  }
})
