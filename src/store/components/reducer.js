import { combineReducers } from 'redux'
import * as R from 'ramda'
import { MODIFY_COMPONENT, INSERT_INSIDE, INSERT_INSIDE_AFTER, INSERT_INSIDE_BEFORE, DELETE_COMPONENTS, INSERT_CUSTOM_INSIDE, INSERT_CUSTOM_INSIDE_AFTER, INSERT_CUSTOM_INSIDE_BEFORE } from './types'
import { APPEND_COMPONENT, INSERT_AFTER, INSERT_BEFORE, APPEND_COMPONENT_TREE, INSERT_TREE_AFTER, INSERT_TREE_BEFORE } from '../scenes/types'

const componentReducer = (prevState = null, action) => {
  switch (action.type) {
    case MODIFY_COMPONENT: {
      const { target, key, value } = action.payload
      const prevTarget = prevState[target]

      return {
        ...prevState,
        [target]: {
          ...prevTarget,
          [key]: value
        }
      }
    }
    case INSERT_INSIDE:
      return {
        ...prevState,
        children: R.append(action.payload.component.id, prevState.children)
      }
    case INSERT_CUSTOM_INSIDE: {
      const { componentTree: { rootComponentId } } = action.payload
      return {
        ...prevState,
        children: R.append(rootComponentId, prevState.children)
      }
    }
    case INSERT_CUSTOM_INSIDE_AFTER: {
      const { afterId, componentTree: { rootComponentId } } = action.payload
      const indexToInsert = R.findIndex(R.equals(afterId), prevState.children) + 1
      return {
        ...prevState,
        children: R.insert(indexToInsert, rootComponentId, prevState.children)
      }
    }
    case INSERT_CUSTOM_INSIDE_BEFORE: {
      const { beforeId, componentTree: { rootComponentId } } = action.payload
      const indexToInsert = R.findIndex(R.equals(beforeId), prevState.children)
      return {
        ...prevState,
        children: R.insert(indexToInsert, rootComponentId, prevState.children)
      }
    }
    case INSERT_INSIDE_BEFORE: {
      const { beforeId, component } = action.payload
      const indexToInsert = R.findIndex(R.equals(beforeId), prevState.children)
      return {
        ...prevState,
        children: R.insert(indexToInsert, component.id, prevState.children)
      }
    }
    case INSERT_INSIDE_AFTER: {
      const { afterId, component } = action.payload
      const indexToInsert = R.findIndex(R.equals(afterId), prevState.children) + 1
      return {
        ...prevState,
        children: R.insert(indexToInsert, component.id, prevState.children)
      }
    }
    default:
      return prevState
  }
}

const INITIAL_STATE = {
  byId: {},
  allIds: []
}

const byIdReducer = (prevState = INITIAL_STATE.byId, action) => {
  switch (action.type) {
    case APPEND_COMPONENT:
    case INSERT_AFTER:
    case INSERT_BEFORE:
      return R.assoc(action.payload.component.id, action.payload.component, prevState)
    case APPEND_COMPONENT_TREE:
    case INSERT_TREE_AFTER:
    case INSERT_TREE_BEFORE:
      return {
        ...prevState,
        ...action.payload.componentTree.byId
      }
    case MODIFY_COMPONENT: {
      const { componentId } = action.payload
      const prevComponent = prevState[componentId]
      return {
        ...prevState,
        [componentId]: componentReducer(prevComponent, action)
      }
    }
    case INSERT_INSIDE: {
      const { component, componentId } = action.payload
      const nextState = R.assoc(component.id, component, prevState)
      const prevComponent = prevState[componentId]
      return {
        ...nextState,
        [componentId]: componentReducer(prevComponent, action)
      }
    }
    case INSERT_CUSTOM_INSIDE: {
      const { componentId, componentTree } = action.payload
      const prevComponent = prevState[componentId]
      return {
        ...prevState,
        ...componentTree.byId,
        [componentId]: componentReducer(prevComponent, action)
      }
    }
    case INSERT_CUSTOM_INSIDE_AFTER:
    case INSERT_CUSTOM_INSIDE_BEFORE: {
      const { parentId, componentTree } = action.payload
      return {
        ...prevState,
        ...componentTree.byId,
        [parentId]: componentReducer(prevState[parentId], action)
      }
    }
    case INSERT_INSIDE_AFTER: 
    case INSERT_INSIDE_BEFORE: {
      const { parentId, component } = action.payload
      const nextState = R.assoc(component.id, component, prevState)
      const prevComponent = prevState[parentId]
      return {
        ...nextState,
        [parentId]: componentReducer(prevComponent, action)
      }
    }
    case DELETE_COMPONENTS: {
      const { componentIds, rootComponentId } = action.payload
      let nextState = { ...prevState }
      const rootComponent = prevState[rootComponentId]

      if (rootComponent.parentId) {
        const parentComponent = nextState[rootComponent.parentId]
        nextState = {
          ...nextState,
          [rootComponent.parentId]: {
            ...parentComponent,
            children: R.filter((childId) => !R.equals(childId, rootComponentId), parentComponent.children)
          }
        }
      }

      for (const idToDelete of componentIds) {
        delete nextState[idToDelete]
      }

      return nextState
    }
    default:
      return prevState
  }
}

const allIdsReducer = (prevState = INITIAL_STATE.allIds, action) => {
  switch (action.type) {
    case APPEND_COMPONENT:
    case INSERT_AFTER:
    case INSERT_BEFORE:
    case INSERT_INSIDE:
    case INSERT_INSIDE_AFTER:
    case INSERT_INSIDE_BEFORE:
      return R.append(action.payload.component.id, prevState)
    case APPEND_COMPONENT_TREE:
    case INSERT_TREE_AFTER:
    case INSERT_TREE_BEFORE:
    case INSERT_CUSTOM_INSIDE:
    case INSERT_CUSTOM_INSIDE_AFTER:
    case INSERT_CUSTOM_INSIDE_BEFORE:
      return [...prevState, ...action.payload.componentTree.allIds]
    case DELETE_COMPONENTS:
      return R.filter((id) => !R.contains(id, action.payload.componentIds), prevState)
    default:
      return prevState
  }
}

export const componentsReducer = combineReducers({
  byId: byIdReducer,
  allIds: allIdsReducer
})
