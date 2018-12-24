import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { store } from './store'
import App from './App'
import './index.css'
import 'rc-tree/assets/index.css'
import './styles/react-contextmenu.css'

/*
import * as sceneOperations from './store/scenes/operations'
import * as appOperations from './store/app/operations'
import * as activeSceneOperations from './store/activeScene/operations'
import * as activeTabOperations from './store/activeTab/operations'
import * as componentsOperations from './store/components/operations'
import { ElementGenerators } from './utils/elements'

const boxComponent = ElementGenerators["@LAYOUT/BOX"].generateInitialComponent(null)
const textComponent = ElementGenerators["@UI/TEXT"].generateInitialComponent(boxComponent.id)
store.dispatch(appOperations.addScene('Test'))
store.dispatch(sceneOperations.appendComponent('Test', boxComponent))
store.dispatch(activeSceneOperations.setActiveScene('Test'))
store.dispatch(activeTabOperations.setActiveTab('Test'))
store.dispatch(componentsOperations.insertInside(boxComponent.id, textComponent))
store.dispatch(componentsOperations.modifyComponent(boxComponent.id, { target: 'style', key: 'height', value: 100 }))
*/

ReactDOM.render(
  (
    <DragDropContextProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DragDropContextProvider>
  ), 
  document.getElementById('root')
)
