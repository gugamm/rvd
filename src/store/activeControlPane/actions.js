import { SET_ACTIVE_CONTROL_PANE } from './types'

export const setActiveControlPane = (controlPaneType) => ({
  type: SET_ACTIVE_CONTROL_PANE,
  payload: controlPaneType
})
