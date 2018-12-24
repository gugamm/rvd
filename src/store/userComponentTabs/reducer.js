import { ADD_TAB, REMOVE_TAB, ADD_COMPONENT, IMPORT_TABS } from './types'
import { combineReducers } from 'redux'
import * as R from 'ramda'

const INITIAL_STATE = {
  byId: {},
  allIds: []
}

export const byIdReducer = (prevState = INITIAL_STATE.byId, action) => {
  switch (action.type) {
    case ADD_TAB: {
      const { tabId, name } = action.payload
      return {
        ...prevState,
        [tabId]: {
          id: tabId,
          name,
          components: []
        }
      }
    }
    case REMOVE_TAB: {
      return R.dissoc(action.payload.tabId, prevState)
    }
    case ADD_COMPONENT: {
      const prevTab = prevState[action.payload.tabId]
      const { tabId } = action.payload
      return {
        ...prevState,
        [tabId]: {
          ...prevTab,
          components: [...prevTab.components, action.payload.component]
        }
      }
    }
    case IMPORT_TABS: {
      return action.payload.reduce((acc, userComponentTab) => {
        acc[userComponentTab.id] = userComponentTab
        return acc
      }, {})
    }
    default:
      return prevState
  }
}

export const allIdsReducer = (prevState = INITIAL_STATE.allIds, action) => {
  switch (action.type) {
    case ADD_TAB:
      return R.append(action.payload.tabId, prevState)
    case REMOVE_TAB:
      return R.filter((tabId) => tabId !== action.payload.tabId, prevState)
    case IMPORT_TABS:
      return action.payload.map(userComponentTab => userComponentTab.id)
    default:
      return prevState
  }
}

export const userComponentTabsReducer = combineReducers({
  byId: byIdReducer,
  allIds: allIdsReducer
})
