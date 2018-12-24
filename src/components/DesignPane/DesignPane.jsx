import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as scenesOperations from '../../store/scenes/operations'
import * as activeComponentOperations from '../../store/activeComponent/operations'
import * as activeControlPaneOperations from '../../store/activeControlPane/operations'
import * as dropTargetOperations from '../../store/dropTarget/operations'
import { generateComponentsTreeFromCustomDescription } from '../../utils/elements'
import { Renderer } from './components'
import { DropTarget } from 'react-dnd'
import { ItemTypes, DropTypes, ControlPaneType } from '../../constants'

const containerStyle = (props) => ({
  overflow: 'auto', 
  position: 'relative',
  minHeight: '100%', 
  display: 'block', 
  flexGrow: 1,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  ...(props.isOver && { border: '1px solid red' })
})

class DesignPane extends React.Component {
  handleClick = () => {
    const { setActiveComponent, setActiveControlPane } = this.props
    setActiveComponent(null)
    setActiveControlPane(ControlPaneType.COMPONENT_SELECTION)
  }

  render() {
    const { componentsToRender, connectDropTarget, isOver } = this.props

    return connectDropTarget(
      <div style={containerStyle({ isOver })} onClick={this.handleClick} onMouseMove={this.handleMouseMove}>
        <Renderer components={componentsToRender} />
      </div>
    )
  }
}

const componentDropTarget = {
  drop(props, monitor) {
    const isOver = monitor.isOver({ shallow: true })

    if (isOver) {
      const { sceneId, appendComponent, appendComponentTree } = props
      const { component } = monitor.getItem()

      if (component.__custom) {
        const componentDescription = component.description
        const componentTree = generateComponentsTreeFromCustomDescription(componentDescription, null)
        appendComponentTree(sceneId, componentTree)
        return
      }

      const componentDescription = component.generateInitialComponent(null)
      appendComponent(sceneId, componentDescription)
    }
  },
  hover(props, monitor) {
    const isOver = monitor.isOver({ shallow: true })
    if (isOver && props.dropTarget.type !== DropTypes.NONE) {
      props.setNoneDropTarget()
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const mapStateToProps = (state, ownProps) => ({
  componentsToRender: state.scenes.byId[ownProps.sceneId].componentIds.map(
    componentId => state.components.byId[componentId]
  ),
  dropTarget: state.dropTarget
})

const mapDispatchToProps = {
  appendComponent: scenesOperations.appendComponent,
  appendComponentTree: scenesOperations.appendComponentTree,
  setActiveComponent: activeComponentOperations.setActiveComponent,
  setNoneDropTarget: dropTargetOperations.setNoneDropTarget,
  setActiveControlPane: activeControlPaneOperations.setActiveControlPane
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.COMPONENT, componentDropTarget, collect)
)

export default enhance(DesignPane)
