import { SET_ACTIVE_TAB } from './types'

export const setActiveTab = (tabId) => ({
  type: SET_ACTIVE_TAB,
  payload: tabId
})
