import * as React from 'react'
import { connect } from 'react-redux'
import * as activeControlPaneOperations from '../../store/activeControlPane/operations'
import { ComponentsPane } from './ComponentsPane'
import { StylePane } from './StylePane'
import { TreePane } from './TreePane'
import { Tabs } from '../Tabs'
import { ControlPaneType } from '../../constants'

class ControlPane extends React.Component {
  handleTabClick = (tabId) => {
    this.props.setActiveControlPane(tabId)
  }

  render() {
    const { activeControlPane } = this.props

    return (
      <div style={{ display: 'flex', flexShrink: 1, margin: '16px 16px 16px 0px' }}>
        <Tabs activeTab={activeControlPane} onTabClick={this.handleTabClick}>
          <Tabs.Tab title='Components' id={ControlPaneType.COMPONENT_SELECTION}>
            <ComponentsPane />
          </Tabs.Tab>
          <Tabs.Tab title='Style Manager' id={ControlPaneType.STYLE}>
            <StylePane />
          </Tabs.Tab>
          <Tabs.Tab title='Tree' id={ControlPaneType.TREE}>
            <TreePane />
          </Tabs.Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activeControlPane: state.activeControlPane
})

const mapDispatchToProps = {
  setActiveControlPane: activeControlPaneOperations.setActiveControlPane
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPane)
