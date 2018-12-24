import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { appReducer } from './app/reducer'
import { activeTabReducer } from './activeTab/reducer'
import { activeSceneReducer } from './activeScene/reducer'
import { scenesReducer } from './scenes/reducer'
import { componentsReducer } from './components/reducer'
import { activeComponentReducer } from './activeComponent/reducer'
import { dropTargetReducer } from './dropTarget/reducer'
import { activeControlPaneReducer } from './activeControlPane/reducer'
import { userComponentTabsReducer } from './userComponentTabs/reducer'

const rootReducer = combineReducers({
  app: appReducer,
  scenes: scenesReducer,
  components: componentsReducer,
  activeTab: activeTabReducer,
  activeScene: activeSceneReducer,
  activeComponent: activeComponentReducer,
  dropTarget: dropTargetReducer,
  activeControlPane: activeControlPaneReducer,
  userComponentTabs: userComponentTabsReducer
})

const middlewares = [
  logger
]

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
