import * as React from 'react'
import Tree from 'rc-tree'
import { connect } from 'react-redux'
import { Wrapper } from './styledComponents'
import * as activeComponentOperations from '../../../store/activeComponent/operations'
import * as activeSceneOperations from '../../../store/activeScene/operations'
import * as activeTabOperations from '../../../store/activeTab/operations'

class TreePane extends React.Component {
  onSelect = (selectedKeys) => {
    if (!selectedKeys.length) {
      return
    }

    const [ selectedType, selectedId ] = selectedKeys[0].split('/')
    
    if (selectedType === '@component') {
      this.props.setActiveComponent(selectedId)
      return
    }

    this.props.setActiveScene(selectedId)
    this.props.setActiveTab(selectedId)
  }

  render() {
    const { treeData, activeComponentId } = this.props

    return (
      <Wrapper>
        {treeData && (
          <Tree
            showLine 
            defaultExpandAll 
            selectedKeys={activeComponentId ? [`@component/${activeComponentId}`] : null}
            showIcon={false}
            expandable={false}
            onSelect={this.onSelect}
            treeData={treeData}
          />
        )}
      </Wrapper>
    )
  }
}

const mapComponentToTreeNode = (state) => (componentId) => {
  const component = state.components.byId[componentId]
  const componentChildren = component.children ? component.children.map(mapComponentToTreeNode(state)) : null
  const treeNode = { key: `@component/${componentId}`, title: component.name, children: componentChildren, style: { color: 'rgb(185, 165, 166)', fontWeight: 'normal' } }
  return treeNode
}

const mapSceneToTreeData = (sceneId, state) => {
  if (!sceneId) {
    return null
  }

  const componentIds = state.scenes.byId[sceneId].componentIds
  const componentNodes = componentIds.map(mapComponentToTreeNode(state))
  const rootTree = { key: `@scene/${sceneId}`, title: sceneId, children: componentNodes, style: { color: 'rgb(185, 165, 166)', fontWeight: 'bold' } }
  return [ rootTree ]
}

const mapStateToProps = (state) => ({
  treeData: mapSceneToTreeData(state.activeScene, state),
  activeComponentId: state.activeComponent
})

const mapDispatchToProps = {
  setActiveComponent: activeComponentOperations.setActiveComponent,
  setActiveScene: activeSceneOperations.setActiveScene,
  setActiveTab: activeTabOperations.setActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(TreePane)
