import * as React from 'react'
import { Accordion } from '../../Accordion'
import { ElementSelection } from '../../ElementSelection'
import { Wrapper, ElementsContainer } from './styledComponents'
import { ElementGenerators } from '../../../utils/elements'
import { connect } from 'react-redux'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import * as userComponentTabsOperations from '../../../store/userComponentTabs/operations'
import { AddTabModal } from './AddTabModal'
import { ImportTabsModal } from './ImportTabsModal'

const uiElements = [
  ElementGenerators["@UI/TEXT"],
  ElementGenerators["@UI/BUTTON"],
  ElementGenerators["@UI/IMAGE"],
  ElementGenerators["@UI/TEXT_AREA"],
  ElementGenerators["@UI/TEXT_INPUT"]
]

const layoutElements = [
  ElementGenerators["@LAYOUT/BOX"]
]

class ComponentsPane extends React.Component {
  state = {
    addTabModal: false,
    importTabsModal: false
  }

  toggleAddTabModal = () => {
    this.setState({
      addTabModal: !this.state.addTabModal
    })
  }

  toggleImportTabsModal = () => {
    this.setState({
      importTabsModal: !this.state.importTabsModal
    })
  }

  handleExportTabs = () => {
    const { userComponentTabs } = this.props
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(userComponentTabs, null, 2)))
    element.setAttribute('download', 'tabs-output.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  handleDeleteTab = (_, componentTab) => {
    this.props.removeTab(componentTab.id)
  }

  renderUserTabComponents = (components) => {
    return components.map((component, index) => <ElementSelection key={index} component={component} />)
  }

  render() {
    const { userComponentTabs } = this.props

    const ui = uiElements.map((uiElement, index) => {
      return (
        <ElementSelection key={index} component={uiElement} />
      )
    })

    const layout = layoutElements.map((uiElement, index) => {
      return (
        <ElementSelection key={index} component={uiElement} />
      )
    })

    const userTabs = userComponentTabs.map(userComponentTab => (
      <ContextMenuTrigger key={userComponentTab.id} id='tabMenu' collect={() => userComponentTab} holdToDisplay={-1}>
        <Accordion title={userComponentTab.name}>
          <ElementsContainer>
            {this.renderUserTabComponents(userComponentTab.components)}
          </ElementsContainer>
        </Accordion>
      </ContextMenuTrigger>
    ))

    return (
      <React.Fragment>
        {this.state.addTabModal && <AddTabModal onClose={this.toggleAddTabModal} />}
        {this.state.importTabsModal && <ImportTabsModal onClose={this.toggleImportTabsModal} />}
        <ContextMenuTrigger id='componentsPaneMenu' holdToDisplay={-1}>
          <Wrapper>
            <Accordion title='UI'>
              <ElementsContainer>
                {ui}
              </ElementsContainer>
            </Accordion>
            <Accordion title='Layout'>
              <ElementsContainer>
                {layout}
              </ElementsContainer>
            </Accordion>
            {userTabs}
          </Wrapper>
        </ContextMenuTrigger>
        <ContextMenu id='componentsPaneMenu'>
          <MenuItem onClick={this.toggleAddTabModal}>Add tab</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={this.handleExportTabs}>Export tabs</MenuItem>
          <MenuItem onClick={this.toggleImportTabsModal}>Import tabs</MenuItem>
        </ContextMenu>
        <ContextMenu id='tabMenu'>
          <MenuItem onClick={this.handleDeleteTab}>Delete tab</MenuItem>
        </ContextMenu>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userComponentTabs: state.userComponentTabs.allIds.map(id => state.userComponentTabs.byId[id])
})

const mapDispatchToProps = {
  removeTab: userComponentTabsOperations.removeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentsPane)
