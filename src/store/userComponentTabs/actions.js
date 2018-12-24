import { ADD_COMPONENT, ADD_TAB, REMOVE_TAB, IMPORT_TABS } from './types'
import uuid from 'uuid/v4'

export const addTab = (tabName) => ({
  type: ADD_TAB,
  payload: {
    tabId: uuid(),
    name: tabName
  }
})

export const removeTab = (tabId) => ({
  type: REMOVE_TAB,
  payload: {
    tabId
  }
})

export const addComponent = (tabId, component) => ({
  type: ADD_COMPONENT,
  payload: {
    tabId,
    component
  }
})

export const importTabs = (userComponentTabs) => ({
  type: IMPORT_TABS,
  payload: userComponentTabs
})
