import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, DesignPane, ControlPane, Tabs, AddSceneTab } from './components'
import * as activeTabOperations from './store/activeTab/operations'
import * as activeSceneOperations from './store/activeScene/operations'
import * as componentsOperations from './store/components/operations'
import * as activeComponentOperations from './store/activeComponent/operations'
import * as appOperations from './store/app/operations'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import { generateComponentIdsFromParent } from './utils/elements'

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',
    height: '100%'
  }
}

class App extends Component {
  isValidSceneId = (sceneId) => {
    const { sceneIds } = this.props
    return sceneIds.indexOf(sceneId) !== -1
  }

  handleDeleteScene = (_, { sceneId }) => {
    const { appState, componentsById } = this.props
    const scene = appState.scenes.byId[sceneId]
    const sceneComponentIds = scene.componentIds
    sceneComponentIds.forEach(sceneComponentId => this.props.deleteComponents(sceneComponentId, generateComponentIdsFromParent(sceneComponentId, componentsById)))
    this.props.deleteScene(sceneId)
    this.props.setActiveScene(null)
    this.props.setActiveTab(null)
  }

  handleTabClick = (tabId) => {
    const { setActiveTab, setActiveScene } = this.props

    setActiveTab(tabId)

    if (this.isValidSceneId(tabId)) {
      setActiveScene(tabId)
    } else {
      setActiveScene(null)
    }
  }

  handleKeyDown = (evt) => {
    const { activeComponent, deleteComponents, setActiveComponent, componentsById } = this.props
    const isDeleteKey = evt.keyCode === 46 // delete

    if (isDeleteKey && activeComponent) {
      setActiveComponent(null)
      const idsToDelete = generateComponentIdsFromParent(activeComponent, componentsById)
      deleteComponents(activeComponent, idsToDelete)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { sceneIds, activeTab } = this.props

    const sceneTabs = sceneIds.map(sceneId => (
      <Tabs.Tab title={sceneId} id={sceneId} key={sceneId} contextMenu={{ id: 'scenesMenu', collect: () => ({ sceneId })}}>
        <DesignPane sceneId={sceneId} />
      </Tabs.Tab>
    ))

    return (
      <React.Fragment>
        <div style={styles.appContainer}>
          <Navbar />
          <div style={styles.contentContainer}>
            <div style={{ display: 'flex', flexGrow: 1, margin: 16 }}>
              <Tabs activeTab={activeTab} onTabClick={this.handleTabClick}>
                {sceneTabs}
                <Tabs.Tab title='+' id='+'>
                  <AddSceneTab />
                </Tabs.Tab>
              </Tabs>
            </div>
            <ControlPane />
          </div>
        </div>
        <ContextMenu id='scenesMenu'>
          <MenuItem onClick={this.handleDeleteScene}>Delete scene</MenuItem>
        </ContextMenu>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  sceneIds: state.app.sceneIds,
  activeTab: state.activeTab,
  activeComponent: state.activeComponent,
  appState: state,
  componentsById: state.components.byId
})

const mapDispatchToProps = {
  deleteScene: appOperations.deleteScene,
  setActiveTab: activeTabOperations.setActiveTab,
  setActiveScene: activeSceneOperations.setActiveScene,
  deleteComponents: componentsOperations.deleteComponents,
  setActiveComponent: activeComponentOperations.setActiveComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
