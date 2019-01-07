import { MODIFY_COMPONENT, INSERT_INSIDE, INSERT_INSIDE_AFTER, INSERT_INSIDE_BEFORE, INSERT_CUSTOM_INSIDE, INSERT_CUSTOM_INSIDE_AFTER, INSERT_CUSTOM_INSIDE_BEFORE, DELETE_COMPONENTS } from './types'

export const modifyComponent = (componentId, { target, key, value }) => ({
  type: MODIFY_COMPONENT,
  payload: {
    componentId,
    target,
    key,
    value
  }
})

export const insertInside = (componentId, componentDescription) => ({
  type: INSERT_INSIDE,
  payload: {
    componentId,
    component: componentDescription
  }
})

export const insertCustomInside = (componentId, componentTree) => ({
  type: INSERT_CUSTOM_INSIDE,
  payload: {
    componentId,
    componentTree
  }
})

export const insertCustomInsideAfter = (parentId, afterId, componentTree) => ({
  type: INSERT_CUSTOM_INSIDE_AFTER,
  payload: {
    parentId,
    afterId,
    componentTree
  }
})

export const insertCustomInsideBefore = (parentId, beforeId, componentTree) => ({
  type: INSERT_CUSTOM_INSIDE_BEFORE,
  payload: {
    parentId,
    beforeId,
    componentTree
  }
})

export const insertInsideAfter = (parentId, afterId, componentDescription) => ({
  type: INSERT_INSIDE_AFTER,
  payload: {
    parentId,
    afterId,
    component: componentDescription
  }
})

export const insertInsideBefore = (parentId, beforeId, componentDescription) => ({
  type: INSERT_INSIDE_BEFORE,
  payload: {
    parentId,
    beforeId,
    component: componentDescription
  }
})

export const deleteComponents = (rootComponentId, componentIds) => ({
  type: DELETE_COMPONENTS,
  payload: {
    rootComponentId,
    componentIds
  }
})
