import * as React from 'react'
import { compose } from 'redux'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { ItemTypes, DropTypes } from '../../../../constants'
import { ElementGenerators, generateComponentsTreeFromCustomDescription } from '../../../../utils/elements'
import * as activeComponentOperations from '../../../../store/activeComponent/operations'
import * as dropTargetOperations from '../../../../store/dropTarget/operations'
import * as scenesOperations from '../../../../store/scenes/operations'
import * as componentsOperations from '../../../../store/components/operations'
import DropSupportLine from './DropSupportLine'

const outlineStyle = ({ isActive, isInsideDropTarget }) => {
  if (isInsideDropTarget) {
    return '2px solid yellow'
  }

  if (isActive) {
    return '2px solid blue'
  }

  return '1px dashed rgba(170,170,170,0.7)'
}

const containerStyle = ({ isActive, isInsideDropTarget }) => ({
  cursor: 'pointer',
  outline: outlineStyle({ isActive, isInsideDropTarget }),
  outlineOffset: '-2px'
})

class ComponentView extends React.Component {
  constructor(props) {
    super(props)
    this.elementRef = React.createRef()
    this.state = {
      isDroppable: false
    }
  }

  handleSelection = (event) => {
    const { componentDescription, setActiveComponent } = this.props
    event.stopPropagation()
    setActiveComponent(componentDescription.id)
  }

  isTopDroppable = (elementHeight, cursorY) => {
    const { componentDescription } = this.props

    const divider = componentDescription.name === '@LAYOUT/BOX' ? 10 : 2

    return (elementHeight / divider) > cursorY
  }

  isBottomDroppable = (elementHeight, cursorY) => {
    const { componentDescription } = this.props

    const divider = componentDescription.name === '@LAYOUT/BOX' ? 10 : 2

    return (elementHeight - (elementHeight / divider)) < cursorY
  }

  isDroppableInside = () => {
    return this.props.componentDescription.name === '@LAYOUT/BOX'
  }

  handleDragOver = (event) => {
    const { setAfterDropTarget, setBeforeDropTarget, componentDescription, dropTarget, setInsideDropTarget } = this.props

    if (this.elementRef.current !== event.target) {
      return
    }

    const rect = event.target.getBoundingClientRect()
    const cursorY = event.clientY - rect.top
    const elementHeight = event.target.offsetHeight
    const isTop = this.isTopDroppable(elementHeight, cursorY)
    const isBottom = this.isBottomDroppable(elementHeight, cursorY)
    const isInside = this.isDroppableInside()
    const isDifferentDropTargetComponent = dropTarget.componentId !== componentDescription.id

    if (isTop && (dropTarget.type !== DropTypes.BEFORE || isDifferentDropTargetComponent)) {
      setBeforeDropTarget(componentDescription.id)
    } else if (isBottom && (dropTarget.type !== DropTypes.AFTER || isDifferentDropTargetComponent)) {
      setAfterDropTarget(componentDescription.id)
    } else if (!isTop && !isBottom && isInside && (dropTarget.type !== DropTypes.INSIDE || isDifferentDropTargetComponent)) {
      setInsideDropTarget(componentDescription.id)
    }
  }

  componentDidMount() {
    const { connectDropTarget } = this.props
    
    connectDropTarget(this.elementRef.current)
  }

  render() {
    const { componentDescription, activeComponent, dropTarget, allComponents } = this.props
    const { name, children, props, style, navigateTo } = componentDescription
    let renderedChildren = children

    if (Array.isArray(children)) {
      renderedChildren = children.map(child => <EnhancedComponentView componentDescription={allComponents[child]} key={child} />)
    }

    const componentView = ElementGenerators[name].generateView({ children: renderedChildren, props, style, navigateTo })
    const isActive = activeComponent === componentDescription.id
    const isDropTarget = dropTarget.componentId === componentDescription.id
    const isAfterDropTarget = dropTarget.type === DropTypes.AFTER && isDropTarget
    const isBeforeDropTarget = dropTarget.type === DropTypes.BEFORE && isDropTarget
    const isInsideDropTarget = dropTarget.type === DropTypes.INSIDE && isDropTarget
    const extendedElement = React.cloneElement(componentView, {
      style: {
        ...style,
        ...containerStyle({ isActive, isInsideDropTarget })
      },
      onClick: this.handleSelection,
      onDragOver: this.handleDragOver,
      ref: this.elementRef
    })

    const elementToRender = extendedElement
    const hasElementRef = !!this.elementRef.current
    const elementTop = hasElementRef ? this.elementRef.current.offsetTop : 0
    const elementLeft = hasElementRef ? this.elementRef.current.offsetLeft : 0
    const elementWidth = hasElementRef ? this.elementRef.current.offsetWidth : 0
    const elementHeight = hasElementRef ? this.elementRef.current.offsetHeight : 0

    return (
      <React.Fragment>
        {hasElementRef && isBeforeDropTarget && <DropSupportLine left={elementLeft} top={elementTop} width={elementWidth} height={2} color='blue' />}
        {elementToRender}
        {hasElementRef && isAfterDropTarget && <DropSupportLine left={elementLeft} top={elementHeight + elementTop} width={elementWidth} height={2} color='blue' />}
      </React.Fragment>
    )
  }
}

const componentDropTarget = {
  drop(props, monitor) {
    const isOver = monitor.isOver({ shallow: true })

    if (!isOver) {
      return
    }

    const { 
      componentDescription: targetComponent, dropTarget, insertComponentAfter, insertComponentBefore, 
      activeScene, setNoneDropTarget, insertInside, insertInsideAfter, insertInsideBefore,
      insertCustomInside, insertCustomInsideAfter, insertCustomInsideBefore, insertTreeAfter, insertTreeBefore
    } = props
    const { component } = monitor.getItem()

    if (dropTarget.type === DropTypes.AFTER) {
      const parentId = targetComponent.parentId
      const descriptionToInsert = component.__custom ? generateComponentsTreeFromCustomDescription(component.description, parentId) : component.generateInitialComponent(parentId)
      if (targetComponent.parentId) {
        component.__custom ? insertCustomInsideAfter(targetComponent.parentId, dropTarget.componentId, descriptionToInsert) : insertInsideAfter(targetComponent.parentId, dropTarget.componentId, descriptionToInsert)
      } else {
        component.__custom ? insertTreeAfter(activeScene, targetComponent.id, descriptionToInsert) : insertComponentAfter(activeScene, targetComponent.id, descriptionToInsert)
      }
    } else if (dropTarget.type === DropTypes.BEFORE) {
      const parentId = targetComponent.parentId
      const descriptionToInsert = component.__custom ? generateComponentsTreeFromCustomDescription(component.description, parentId) : component.generateInitialComponent(parentId)
      if (targetComponent.parentId) {
        component.__custom ? insertCustomInsideBefore(targetComponent.parentId, dropTarget.componentId, descriptionToInsert) : insertInsideBefore(targetComponent.parentId, dropTarget.componentId, descriptionToInsert)
      } else {
        component.__custom ? insertTreeBefore(activeScene, targetComponent.id, descriptionToInsert) : insertComponentBefore(activeScene, targetComponent.id, descriptionToInsert)
      }
    } else if (dropTarget.type === DropTypes.INSIDE) {
      const parentId = targetComponent.id
      const descriptionToInsert = component.__custom ? generateComponentsTreeFromCustomDescription(component.description, parentId) : component.generateInitialComponent(parentId)
      component.__custom ? insertCustomInside(targetComponent.id, descriptionToInsert) : insertInside(targetComponent.id, descriptionToInsert)
    }

    setNoneDropTarget()
  }
}

const collect = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const mapStateToProps = (state) => ({
  activeComponent: state.activeComponent,
  dropTarget: state.dropTarget,
  activeScene: state.activeScene,
  allComponents: state.components.byId
})

const mapDispatchToProps = {
  insertCustomInsideAfter: componentsOperations.insertCustomInsideAfter,
  insertCustomInsideBefore: componentsOperations.insertCustomInsideBefore,
  insertCustomInside: componentsOperations.insertCustomInside,
  setActiveComponent: activeComponentOperations.setActiveComponent,
  setAfterDropTarget: dropTargetOperations.setAfterDropTarget,
  setBeforeDropTarget: dropTargetOperations.setBeforeDropTarget,
  setNoneDropTarget: dropTargetOperations.setNoneDropTarget,
  setInsideDropTarget: dropTargetOperations.setInsideDropTarget,
  insertComponentAfter: scenesOperations.insertAfter,
  insertComponentBefore: scenesOperations.insertBefore,
  insertTreeAfter: scenesOperations.insertTreeAfter,
  insertTreeBefore: scenesOperations.insertTreeBefore,
  insertInside: componentsOperations.insertInside,
  insertInsideAfter: componentsOperations.insertInsideAfter,
  insertInsideBefore: componentsOperations.insertInsideBefore
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.COMPONENT, componentDropTarget, collect)
)

const EnhancedComponentView = enhance(ComponentView)

export default EnhancedComponentView
